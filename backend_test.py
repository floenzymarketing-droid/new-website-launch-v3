import requests
import os
from datetime import datetime

# Load backend URL from frontend/.env
def get_backend_url():
    env_path = "/app/frontend/.env"
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.split('=')[1].strip()
    return None

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

print(f"Testing backend at: {API_URL}")
print("=" * 80)

# Track test results
passed = 0
failed = 0
test_results = []

def test_result(name, success, message=""):
    global passed, failed
    if success:
        passed += 1
        status = "✅ PASS"
    else:
        failed += 1
        status = "❌ FAIL"
    result = f"{status}: {name}"
    if message:
        result += f" - {message}"
    print(result)
    test_results.append({"name": name, "success": success, "message": message})
    return success

# =============================================================================
# TEST 1: GET /api/catalog
# =============================================================================
print("\n1. Testing GET /api/catalog")
print("-" * 80)
try:
    response = requests.get(f"{API_URL}/catalog", timeout=10)
    if response.status_code == 200:
        data = response.json()
        
        # Check product
        product = data.get("product", {})
        test_result("Catalog - Product SKU", product.get("sku") == "SH001")
        test_result("Catalog - Product Price", product.get("price") == 55.0)
        test_result("Catalog - Product Currency", product.get("currency") == "£")
        test_result("Catalog - Product Colours", 
                   set(product.get("colours", [])) == {"Beige", "Grey-red"})
        
        # Check refill
        refill = data.get("refill", {})
        test_result("Catalog - Refill SKU", refill.get("sku") == "FILTER-REFILL")
        test_result("Catalog - Refill Price", refill.get("price") == 19.0)
        
        # Check plans
        plans = data.get("plans", [])
        test_result("Catalog - Plans Count", len(plans) == 3)
        expected_plans = [
            {"interval_months": 2, "discount_pct": 20},
            {"interval_months": 3, "discount_pct": 15},
            {"interval_months": 4, "discount_pct": 10}
        ]
        for exp in expected_plans:
            found = any(p["interval_months"] == exp["interval_months"] and 
                       p["discount_pct"] == exp["discount_pct"] for p in plans)
            test_result(f"Catalog - Plan {exp['interval_months']} months with {exp['discount_pct']}% discount", found)
        
        # Check stock
        stock = data.get("stock", {})
        test_result("Catalog - Stock has SH001::Beige", "SH001::Beige" in stock)
        test_result("Catalog - Stock has SH001::Grey-red", "SH001::Grey-red" in stock)
        test_result("Catalog - Stock has FILTER-REFILL::", "FILTER-REFILL::" in stock)
        
        print(f"Stock levels: {stock}")
    else:
        test_result("Catalog - Response", False, f"Status {response.status_code}")
except Exception as e:
    test_result("Catalog - Request", False, str(e))

# =============================================================================
# TEST 2: GET /api/reviews
# =============================================================================
print("\n2. Testing GET /api/reviews")
print("-" * 80)
try:
    response = requests.get(f"{API_URL}/reviews", timeout=10)
    if response.status_code == 200:
        reviews = response.json()
        test_result("Reviews - GET returns list", isinstance(reviews, list))
        test_result("Reviews - Has seeded reviews", len(reviews) >= 3, 
                   f"Found {len(reviews)} reviews")
        
        if reviews:
            review = reviews[0]
            required_fields = ["id", "name", "rating", "title", "body", "location", "created_at"]
            for field in required_fields:
                test_result(f"Reviews - Has field '{field}'", field in review)
    else:
        test_result("Reviews - GET", False, f"Status {response.status_code}")
except Exception as e:
    test_result("Reviews - GET Request", False, str(e))

# =============================================================================
# TEST 3: POST /api/reviews
# =============================================================================
print("\n3. Testing POST /api/reviews")
print("-" * 80)
try:
    # Get initial count
    initial_response = requests.get(f"{API_URL}/reviews", timeout=10)
    initial_count = len(initial_response.json()) if initial_response.status_code == 200 else 0
    
    # Create new review
    new_review = {
        "name": "Tester",
        "rating": 5,
        "title": "Great",
        "body": "Loved it"
    }
    response = requests.post(f"{API_URL}/reviews", json=new_review, timeout=10)
    
    if response.status_code == 200:
        created = response.json()
        test_result("Reviews - POST creates review", "id" in created)
        test_result("Reviews - POST returns correct name", created.get("name") == "Tester")
        test_result("Reviews - POST returns correct rating", created.get("rating") == 5)
        
        # Verify count increased
        after_response = requests.get(f"{API_URL}/reviews", timeout=10)
        after_count = len(after_response.json()) if after_response.status_code == 200 else 0
        test_result("Reviews - POST increases count", after_count == initial_count + 1,
                   f"Before: {initial_count}, After: {after_count}")
    else:
        test_result("Reviews - POST", False, f"Status {response.status_code}")
    
    # Test validation - rating outside 1-5
    invalid_review = {
        "name": "Invalid",
        "rating": 6,
        "title": "Bad",
        "body": "Should fail"
    }
    response = requests.post(f"{API_URL}/reviews", json=invalid_review, timeout=10)
    test_result("Reviews - POST validation (rating > 5)", response.status_code == 422,
               f"Expected 422, got {response.status_code}")
    
    invalid_review["rating"] = 0
    response = requests.post(f"{API_URL}/reviews", json=invalid_review, timeout=10)
    test_result("Reviews - POST validation (rating < 1)", response.status_code == 422,
               f"Expected 422, got {response.status_code}")
    
except Exception as e:
    test_result("Reviews - POST Request", False, str(e))

# =============================================================================
# TEST 4: GET /api/water-hardness/{postcode}
# =============================================================================
print("\n4. Testing GET /api/water-hardness/{postcode}")
print("-" * 80)

test_cases = [
    {"postcode": "SW1A", "expected_level": "Very Hard", "expected_ppm_range": (280, 320)},
    {"postcode": "M1", "expected_level": "Soft", "expected_ppm_range": (30, 50)},
    {"postcode": "G1", "expected_level": "Soft", "expected_ppm_range": (10, 30)},
    {"postcode": "TF3", "expected_level": "Hard", "expected_ppm_range": (190, 210)},
    {"postcode": "ZZ99", "expected_level": "Moderately Hard", "expected_ppm": 180},  # Unknown default
]

for tc in test_cases:
    try:
        response = requests.get(f"{API_URL}/water-hardness/{tc['postcode']}", timeout=10)
        if response.status_code == 200:
            data = response.json()
            
            # Check required fields
            required_fields = ["postcode", "area", "ppm", "level", "recommendation"]
            all_fields_present = all(field in data for field in required_fields)
            test_result(f"Water Hardness - {tc['postcode']} has all fields", all_fields_present)
            
            # Check level
            test_result(f"Water Hardness - {tc['postcode']} level", 
                       data.get("level") == tc["expected_level"],
                       f"Expected {tc['expected_level']}, got {data.get('level')}")
            
            # Check ppm range or exact value
            ppm = data.get("ppm")
            if "expected_ppm" in tc:
                test_result(f"Water Hardness - {tc['postcode']} ppm", 
                           ppm == tc["expected_ppm"],
                           f"Expected {tc['expected_ppm']}, got {ppm}")
            else:
                min_ppm, max_ppm = tc["expected_ppm_range"]
                test_result(f"Water Hardness - {tc['postcode']} ppm in range", 
                           min_ppm <= ppm <= max_ppm,
                           f"Expected {min_ppm}-{max_ppm}, got {ppm}")
            
            # Check recommendation exists
            test_result(f"Water Hardness - {tc['postcode']} has recommendation", 
                       len(data.get("recommendation", "")) > 0)
        else:
            test_result(f"Water Hardness - {tc['postcode']}", False, 
                       f"Status {response.status_code}")
    except Exception as e:
        test_result(f"Water Hardness - {tc['postcode']}", False, str(e))

# =============================================================================
# TEST 5: POST /api/orders (Critical - validates stock and decrements)
# =============================================================================
print("\n5. Testing POST /api/orders")
print("-" * 80)

try:
    # Get initial stock
    catalog_response = requests.get(f"{API_URL}/catalog", timeout=10)
    initial_stock = catalog_response.json().get("stock", {})
    initial_beige_stock = initial_stock.get("SH001::Beige", 0)
    print(f"Initial SH001::Beige stock: {initial_beige_stock}")
    
    # Create order
    order_data = {
        "items": [
            {"sku": "SH001", "colour": "Beige", "qty": 2}
        ],
        "customer": {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "address": "1 Test St",
            "city": "London",
            "postcode": "SW1A"
        }
    }
    
    response = requests.post(f"{API_URL}/orders", json=order_data, timeout=10)
    
    if response.status_code == 200:
        order = response.json()
        
        # Check order structure
        test_result("Orders - POST returns order with id", "id" in order)
        test_result("Orders - POST subtotal", order.get("subtotal") == 110.0,
                   f"Expected 110.0, got {order.get('subtotal')}")
        test_result("Orders - POST total", order.get("total") == 110.0,
                   f"Expected 110.0, got {order.get('total')}")
        test_result("Orders - POST currency", order.get("currency") == "£")
        test_result("Orders - POST status", order.get("status") == "confirmed")
        
        # Check items
        items = order.get("items", [])
        if items:
            item = items[0]
            test_result("Orders - POST item unit_price", item.get("unit_price") == 55.0)
            test_result("Orders - POST item line_total", item.get("line_total") == 110.0)
        
        # Verify stock decreased
        catalog_response = requests.get(f"{API_URL}/catalog", timeout=10)
        after_stock = catalog_response.json().get("stock", {})
        after_beige_stock = after_stock.get("SH001::Beige", 0)
        print(f"After order SH001::Beige stock: {after_beige_stock}")
        
        test_result("Orders - POST decrements stock", 
                   after_beige_stock == initial_beige_stock - 2,
                   f"Expected {initial_beige_stock - 2}, got {after_beige_stock}")
        
        # Test GET /api/orders/{id}
        order_id = order.get("id")
        get_response = requests.get(f"{API_URL}/orders/{order_id}", timeout=10)
        test_result("Orders - GET by ID returns order", get_response.status_code == 200)
        
        # Test GET with random ID (should 404)
        random_id = "nonexistent-order-id-12345"
        get_response = requests.get(f"{API_URL}/orders/{random_id}", timeout=10)
        test_result("Orders - GET by invalid ID returns 404", get_response.status_code == 404)
        
    else:
        test_result("Orders - POST", False, f"Status {response.status_code}: {response.text}")
        
except Exception as e:
    test_result("Orders - POST Request", False, str(e))

# Test order with subscription
print("\n5b. Testing POST /api/orders with subscription")
print("-" * 80)
try:
    order_data = {
        "items": [
            {"sku": "SH001", "colour": "Grey-red", "qty": 1}
        ],
        "customer": {
            "name": "Sub Customer",
            "email": "sub@example.com",
            "address": "2 Test Ave",
            "city": "Manchester",
            "postcode": "M1"
        },
        "subscription": {
            "interval_months": 3
        }
    }
    
    response = requests.post(f"{API_URL}/orders", json=order_data, timeout=10)
    
    if response.status_code == 200:
        order = response.json()
        
        # Check subscription in order
        subscription = order.get("subscription")
        test_result("Orders - POST with subscription has subscription field", 
                   subscription is not None)
        
        if subscription:
            test_result("Orders - Subscription discount_pct", 
                       subscription.get("discount_pct") == 15,
                       f"Expected 15, got {subscription.get('discount_pct')}")
            test_result("Orders - Subscription price", 
                       subscription.get("price") == 16.15,
                       f"Expected 16.15 (19*0.85), got {subscription.get('price')}")
            test_result("Orders - Subscription interval", 
                       subscription.get("interval_months") == 3)
    else:
        test_result("Orders - POST with subscription", False, 
                   f"Status {response.status_code}: {response.text}")
        
except Exception as e:
    test_result("Orders - POST with subscription", False, str(e))

# Test insufficient stock
print("\n5c. Testing POST /api/orders with insufficient stock")
print("-" * 80)
try:
    order_data = {
        "items": [
            {"sku": "SH001", "colour": "Beige", "qty": 100000}
        ],
        "customer": {
            "name": "Big Order",
            "email": "big@example.com",
            "address": "3 Test Rd",
            "city": "London",
            "postcode": "SW1A"
        }
    }
    
    response = requests.post(f"{API_URL}/orders", json=order_data, timeout=10)
    test_result("Orders - POST insufficient stock returns 409", 
               response.status_code == 409,
               f"Expected 409, got {response.status_code}")
    
except Exception as e:
    test_result("Orders - POST insufficient stock", False, str(e))

# Test unknown SKU
print("\n5d. Testing POST /api/orders with unknown SKU")
print("-" * 80)
try:
    order_data = {
        "items": [
            {"sku": "UNKNOWN-SKU", "qty": 1}
        ],
        "customer": {
            "name": "Unknown SKU",
            "email": "unknown@example.com",
            "address": "4 Test Ln",
            "city": "London",
            "postcode": "SW1A"
        }
    }
    
    response = requests.post(f"{API_URL}/orders", json=order_data, timeout=10)
    test_result("Orders - POST unknown SKU returns 400", 
               response.status_code == 400,
               f"Expected 400, got {response.status_code}")
    
except Exception as e:
    test_result("Orders - POST unknown SKU", False, str(e))

# =============================================================================
# TEST 6: POST /api/subscriptions
# =============================================================================
print("\n6. Testing POST /api/subscriptions")
print("-" * 80)

try:
    subscription_data = {
        "interval_months": 2,
        "customer": {
            "name": "Sub User",
            "email": "s@e.com",
            "address": "5 Sub St",
            "city": "London",
            "postcode": "SW1A"
        }
    }
    
    response = requests.post(f"{API_URL}/subscriptions", json=subscription_data, timeout=10)
    
    if response.status_code == 200:
        subscription = response.json()
        
        test_result("Subscriptions - POST returns subscription with id", "id" in subscription)
        test_result("Subscriptions - POST sku", subscription.get("sku") == "FILTER-REFILL")
        test_result("Subscriptions - POST discount_pct", 
                   subscription.get("discount_pct") == 20,
                   f"Expected 20, got {subscription.get('discount_pct')}")
        test_result("Subscriptions - POST price", 
                   subscription.get("price") == 15.20,
                   f"Expected 15.20 (19*0.80), got {subscription.get('price')}")
        test_result("Subscriptions - POST has next_ship", "next_ship" in subscription)
        
        # Verify next_ship is in the future
        if "next_ship" in subscription:
            next_ship = datetime.fromisoformat(subscription["next_ship"].replace('Z', '+00:00'))
            is_future = next_ship > datetime.now(next_ship.tzinfo)
            test_result("Subscriptions - POST next_ship is in future", is_future)
    else:
        test_result("Subscriptions - POST", False, 
                   f"Status {response.status_code}: {response.text}")
    
    # Test invalid interval
    invalid_subscription = {
        "interval_months": 5,
        "customer": {
            "name": "Invalid Sub",
            "email": "invalid@e.com"
        }
    }
    
    response = requests.post(f"{API_URL}/subscriptions", json=invalid_subscription, timeout=10)
    test_result("Subscriptions - POST invalid interval returns 400", 
               response.status_code == 400,
               f"Expected 400, got {response.status_code}")
    
except Exception as e:
    test_result("Subscriptions - POST Request", False, str(e))

# =============================================================================
# SUMMARY
# =============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"Total Tests: {passed + failed}")
print(f"✅ Passed: {passed}")
print(f"❌ Failed: {failed}")
print(f"Success Rate: {(passed / (passed + failed) * 100):.1f}%")

if failed > 0:
    print("\n" + "=" * 80)
    print("FAILED TESTS:")
    print("=" * 80)
    for result in test_results:
        if not result["success"]:
            print(f"❌ {result['name']}")
            if result["message"]:
                print(f"   {result['message']}")

print("\n" + "=" * 80)
print("Testing complete!")
print("=" * 80)
