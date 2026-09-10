from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Literal
import uuid
import re
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# ==========================================================================
# FLOENZY DOMAIN
# ==========================================================================

CURRENCY = "£"

# ---- Pricing (backend authoritative) ----
PRICES = {
    "SH001": 55.0,          # Floenzy shower head
    "FILTER-REFILL": 19.0,  # replacement cartridge
}
SHOWER_COLOURS = ["Beige", "Grey-red"]

# Subscription plans: interval months -> discount %
SUB_PLANS = [
    {"interval_months": 2, "discount_pct": 20, "label": "Every 2 months"},
    {"interval_months": 3, "discount_pct": 15, "label": "Every 3 months"},
    {"interval_months": 4, "discount_pct": 10, "label": "Every 4 months"},
]

# ---- UK water hardness by postcode AREA (leading letters) ----
# ppm = mg/l CaCO3 (approximate typical values)
WATER_AREAS = {
    # Very hard / hard — London, South East, East, Midlands
    "E": 300, "EC": 320, "N": 300, "NW": 300, "SE": 290, "SW": 300, "W": 310, "WC": 320,
    "EN": 300, "HA": 300, "IG": 300, "RM": 300, "UB": 310, "TW": 300, "KT": 290, "CR": 280,
    "BR": 280, "DA": 300, "SM": 290, "WD": 300, "AL": 320, "HP": 320, "LU": 330, "SG": 330,
    "SS": 300, "CM": 310, "CO": 300, "IP": 300, "NR": 300, "CB": 340, "PE": 330, "MK": 330,
    "OX": 300, "RG": 300, "SL": 300, "GU": 250, "SO": 260, "PO": 250, "RH": 240, "TN": 240,
    "ME": 290, "CT": 290, "SN": 300, "GL": 290, "HR": 250, "WR": 280, "CV": 300, "NN": 320,
    "LE": 300, "DE": 260, "NG": 300, "LN": 330, "B": 250, "DY": 220, "WS": 250, "WV": 230,
    "BA": 280, "BS": 280, "TA": 260, "BH": 250, "DT": 280, "SP": 300, "HU": 320, "YO": 300,
    "DN": 300, "S": 150, "WF": 160, "LS": 150,
    # Soft — South West, Wales, North West, North East, Scotland
    "TR": 40, "PL": 50, "TQ": 60, "EX": 70,
    "CF": 60, "NP": 90, "SA": 50, "LL": 40, "LD": 60, "SY": 120, "TF": 200,
    "M": 40, "BL": 40, "BB": 40, "OL": 40, "SK": 60, "WA": 90, "WN": 50, "PR": 50,
    "L": 60, "CH": 150, "CW": 180, "FY": 50, "LA": 40, "CA": 40,
    "NE": 40, "SR": 40, "DH": 40, "DL": 60, "TS": 120,
    "BD": 60, "HD": 60, "HX": 60, "HG": 200,
    "G": 20, "EH": 40, "KA": 30, "ML": 20, "PA": 20, "FK": 30, "KY": 40, "DD": 30,
    "AB": 30, "IV": 30, "PH": 30, "DG": 40, "TD": 60, "KW": 30, "ZE": 30, "HS": 20,
    "BT": 90,  # Northern Ireland
}

def hardness_band(ppm: int):
    if ppm < 100:
        return "Soft"
    if ppm < 200:
        return "Moderately Hard"
    if ppm < 300:
        return "Hard"
    return "Very Hard"

def hardness_recommendation(level: str):
    if level in ("Very Hard", "Hard"):
        return ("Your water is exactly the kind Floenzy was built for. Chlorine and "
                "minerals at this level visibly affect skin and hair — a 3-stage "
                "vitamin C filter will make a noticeable difference from day one.")
    if level == "Moderately Hard":
        return ("Your water carries enough chlorine and minerals to dry skin and dull "
                "hair over time. Floenzy softens every shower and protects your routine.")
    return ("Lucky you — your water is naturally soft. Floenzy still removes residual "
            "chlorine for a purer, spa-like shower and healthier-feeling hair.")


# ---- Models ----
class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str = "United Kingdom"
    rating: int = 5
    title: str
    body: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ReviewCreate(BaseModel):
    name: str
    location: Optional[str] = "United Kingdom"
    rating: int = Field(ge=1, le=5)
    title: str
    body: str

class OrderItemIn(BaseModel):
    sku: str
    colour: Optional[str] = None
    qty: int = Field(ge=1)

class Customer(BaseModel):
    name: str
    email: str
    address: Optional[str] = ""
    city: Optional[str] = ""
    postcode: Optional[str] = ""

class SubscriptionIn(BaseModel):
    interval_months: int
    customer: Optional[Customer] = None

class OrderCreate(BaseModel):
    items: List[OrderItemIn]
    customer: Customer
    subscription: Optional[SubscriptionIn] = None

class OrderItemOut(BaseModel):
    sku: str
    colour: Optional[str] = None
    qty: int
    unit_price: float
    line_total: float
    name: str

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    items: List[OrderItemOut]
    customer: Customer
    subscription: Optional[dict] = None
    subtotal: float
    discount: float
    total: float
    currency: str = CURRENCY
    status: str = "confirmed"
    created_at: datetime

class SubscriptionCreate(BaseModel):
    interval_months: int
    customer: Customer

class Subscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    sku: str = "FILTER-REFILL"
    interval_months: int
    discount_pct: int
    unit_price: float
    price: float
    currency: str = CURRENCY
    customer: Customer
    next_ship: datetime
    created_at: datetime


# ---- Catalog ----
@api_router.get("/catalog")
async def get_catalog():
    stock_docs = await db.stock.find({}, {"_id": 0}).to_list(1000)
    stock = {}
    for s in stock_docs:
        stock[f"{s['sku']}::{s.get('colour','')}"] = s["quantity"]
    return {
        "product": {
            "sku": "SH001",
            "name": "Floenzy",
            "title": "The Premium Filtered Shower Head",
            "price": PRICES["SH001"],
            "currency": CURRENCY,
            "colours": SHOWER_COLOURS,
        },
        "refill": {
            "sku": "FILTER-REFILL",
            "name": "Floenzy Filter Cartridge",
            "price": PRICES["FILTER-REFILL"],
            "currency": CURRENCY,
        },
        "plans": SUB_PLANS,
        "stock": stock,
    }


# ---- Reviews ----
@api_router.get("/reviews", response_model=List[Review])
async def list_reviews():
    docs = await db.reviews.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs

@api_router.post("/reviews", response_model=Review)
async def create_review(payload: ReviewCreate):
    review = Review(**payload.model_dump())
    doc = review.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.reviews.insert_one(doc)
    return review


# ---- Water hardness ----
@api_router.get("/water-hardness/{postcode}")
async def water_hardness(postcode: str):
    raw = (postcode or "").upper().strip().replace(" ", "")
    m = re.match(r"^([A-Z]{1,2})", raw)
    area = m.group(1) if m else ""
    # try 2-letter area first, then 1-letter
    ppm = None
    matched = ""
    if len(area) == 2 and area in WATER_AREAS:
        ppm, matched = WATER_AREAS[area], area
    elif area[:1] in WATER_AREAS:
        ppm, matched = WATER_AREAS[area[:1]], area[:1]
    if ppm is None:
        ppm, matched = 180, area or "?"  # default moderately hard
    level = hardness_band(ppm)
    return {
        "postcode": raw or postcode,
        "area": matched,
        "ppm": ppm,
        "level": level,
        "recommendation": hardness_recommendation(level),
    }


# ---- Orders ----
@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    from fastapi import HTTPException
    out_items: List[OrderItemOut] = []
    subtotal = 0.0
    # validate + reserve stock
    for it in payload.items:
        if it.sku not in PRICES:
            raise HTTPException(status_code=400, detail=f"Unknown SKU {it.sku}")
        colour = it.colour if it.sku == "SH001" else None
        stock_q = {"sku": it.sku}
        if colour:
            stock_q["colour"] = colour
        stock_doc = await db.stock.find_one(stock_q)
        available = stock_doc["quantity"] if stock_doc else 0
        if available < it.qty:
            raise HTTPException(status_code=409,
                                detail=f"Insufficient stock for {it.sku} ({colour or 'default'})")
        unit = PRICES[it.sku]
        line = round(unit * it.qty, 2)
        subtotal += line
        name = "Floenzy Filtered Shower Head" if it.sku == "SH001" else "Floenzy Filter Cartridge"
        out_items.append(OrderItemOut(sku=it.sku, colour=colour, qty=it.qty,
                                      unit_price=unit, line_total=line, name=name))

    discount = 0.0
    sub_record = None
    if payload.subscription:
        plan = next((p for p in SUB_PLANS
                     if p["interval_months"] == payload.subscription.interval_months), None)
        if plan:
            refill_price = PRICES["FILTER-REFILL"]
            sub_record = {
                "sku": "FILTER-REFILL",
                "interval_months": plan["interval_months"],
                "discount_pct": plan["discount_pct"],
                "unit_price": refill_price,
                "price": round(refill_price * (1 - plan["discount_pct"] / 100), 2),
            }

    subtotal = round(subtotal, 2)
    total = round(subtotal - discount, 2)
    order = Order(
        id=str(uuid.uuid4()),
        items=out_items,
        customer=payload.customer,
        subscription=sub_record,
        subtotal=subtotal,
        discount=discount,
        total=total,
        created_at=datetime.now(timezone.utc),
    )

    # commit stock decrement
    for it in payload.items:
        q = {"sku": it.sku}
        if it.sku == "SH001":
            q["colour"] = it.colour
        await db.stock.update_one(q, {"$inc": {"quantity": -it.qty}})

    doc = order.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.orders.insert_one(doc)

    # persist subscription if any
    if sub_record:
        s = Subscription(
            id=str(uuid.uuid4()),
            interval_months=sub_record["interval_months"],
            discount_pct=sub_record["discount_pct"],
            unit_price=sub_record["unit_price"],
            price=sub_record["price"],
            customer=payload.customer,
            next_ship=datetime.now(timezone.utc) + timedelta(days=30 * sub_record["interval_months"]),
            created_at=datetime.now(timezone.utc),
        )
        sdoc = s.model_dump()
        sdoc["next_ship"] = sdoc["next_ship"].isoformat()
        sdoc["created_at"] = sdoc["created_at"].isoformat()
        await db.subscriptions.insert_one(sdoc)

    return order

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    from fastapi import HTTPException
    doc = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Order not found")
    if isinstance(doc.get("created_at"), str):
        doc["created_at"] = datetime.fromisoformat(doc["created_at"])
    return doc


# ---- Subscriptions ----
@api_router.post("/subscriptions", response_model=Subscription)
async def create_subscription(payload: SubscriptionCreate):
    from fastapi import HTTPException
    plan = next((p for p in SUB_PLANS if p["interval_months"] == payload.interval_months), None)
    if not plan:
        raise HTTPException(status_code=400, detail="Invalid plan")
    refill_price = PRICES["FILTER-REFILL"]
    s = Subscription(
        id=str(uuid.uuid4()),
        interval_months=plan["interval_months"],
        discount_pct=plan["discount_pct"],
        unit_price=refill_price,
        price=round(refill_price * (1 - plan["discount_pct"] / 100), 2),
        customer=payload.customer,
        next_ship=datetime.now(timezone.utc) + timedelta(days=30 * plan["interval_months"]),
        created_at=datetime.now(timezone.utc),
    )
    doc = s.model_dump()
    doc["next_ship"] = doc["next_ship"].isoformat()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.subscriptions.insert_one(doc)
    return s


# ---- Seed ----
SEED_REVIEWS = [
    {"name": "Christiany", "location": "United Kingdom", "rating": 5,
     "title": "A noticeable difference in the shower",
     "body": "Straightforward to fit onto my existing UK shower hose — no tools needed. The water pressure is good and the water feels nicer on my skin. The three-stage filtration and vitamin C are a lovely addition, and it doesn't look out of place in the bathroom."},
    {"name": "Recommended Reviews", "location": "United Kingdom", "rating": 5,
     "title": "The flo that steals the show",
     "body": "Fitting it was quick and simple — unscrew the old, screw on the new. The pressure is excellent and consistent, and the modern design looks great in the bathroom. Highly recommended."},
    {"name": "Fab Finds", "location": "United Kingdom", "rating": 4,
     "title": "Noticeable difference in skin and hair",
     "body": "After a couple of weeks, skin feels far less dry and hair feels softer without that stiff residue left by chlorine and minerals. The pressure stays strong and steady through the multi-stage filter."},
]

async def seed_data():
    if await db.stock.count_documents({}) == 0:
        await db.stock.insert_many([
            {"sku": "SH001", "colour": "Beige", "quantity": 250},
            {"sku": "SH001", "colour": "Grey-red", "quantity": 180},
            {"sku": "FILTER-REFILL", "colour": "", "quantity": 500},
        ])
        logger.info("Seeded stock")
    if await db.reviews.count_documents({}) == 0:
        docs = []
        for r in SEED_REVIEWS:
            rv = Review(**r).model_dump()
            rv["created_at"] = rv["created_at"].isoformat()
            docs.append(rv)
        await db.reviews.insert_many(docs)
        logger.info("Seeded reviews")

@app.on_event("startup")
async def on_startup():
    try:
        await seed_data()
    except Exception as e:
        logger.error(f"Seed error: {e}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()