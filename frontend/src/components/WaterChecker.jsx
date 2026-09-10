import React, { useState } from "react";
import { Search, Droplet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getWaterHardness } from "../lib/api";

const bandStyles = {
  "Very Hard": { pct: 100, tint: "#8a4b3a" },
  Hard: { pct: 78, tint: "#a5673f" },
  "Moderately Hard": { pct: 52, tint: "#8a6f4e" },
  Soft: { pct: 26, tint: "#6f7d5a" },
};

const WaterChecker = () => {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const check = async (e) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await getWaterHardness(postcode.trim());
      setResult(data);
    } catch (err) {
      setError("Couldn't check that postcode. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const style = result ? bandStyles[result.level] || bandStyles["Moderately Hard"] : null;

  return (
    <div className="max-w-[720px] mx-auto">
      <form onSubmit={check} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center border-b border-[var(--ink)] pb-2">
          <Droplet size={18} className="text-[var(--accent)] mr-3" />
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            placeholder="Enter your UK postcode — e.g. SW1A"
            className="w-full bg-transparent outline-none font-sans-ui tracking-wide text-lg placeholder:text-[var(--muted)]"
          />
        </div>
        <button type="submit" className="btn-solid justify-center" disabled={loading}>
          {loading ? "Checking…" : "Check my water"} <Search size={14} />
        </button>
      </form>

      {error && <p className="body-copy text-sm mt-4 text-[#8a4b3a]">{error}</p>}

      {result && (
        <div className="mt-12 text-left">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <p className="kicker">Area {result.area} · ~{result.ppm} mg/l CaCO₃</p>
            <p className="kicker">hardness</p>
          </div>
          <h3 className="display text-6xl md:text-7xl mt-3" style={{ color: style.tint }}>
            {result.level}.
          </h3>
          {/* gauge */}
          <div className="mt-6 h-[3px] w-full bg-[var(--line)] relative overflow-hidden">
            <div
              className="h-full transition-all duration-700"
              style={{ width: `${style.pct}%`, background: style.tint }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {["Soft", "Moderate", "Hard", "Very Hard"].map((l) => (
              <span key={l} className="font-sans-ui text-[0.6rem] tracking-[0.18em] uppercase text-[var(--muted)]">
                {l}
              </span>
            ))}
          </div>
          <p className="body-copy text-lg mt-8 max-w-[560px]">{result.recommendation}</p>
          <Link to="/shop" className="btn-line mt-8">
            Shop Floenzy — £55 <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default WaterChecker;
