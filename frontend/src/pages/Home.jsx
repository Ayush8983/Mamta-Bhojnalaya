import restaurantImg from "../assets/resturant.png";
import paneerButterMasalaImg from "../assets/paneer-butter-masala.jpg";
import dalTadkaImg from "../assets/dal-tadka.jpg";
import matarPaneerImg from "../assets/matar-paneer.jpg";
import tandooriRotiImg from "../assets/tandoori-roti.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center px-4 py-12 bg-gradient-to-br from-yellow-50 to-orange-50 min-h-screen">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="text-sm uppercase tracking-widest text-orange-500 font-medium mb-2">
          🍽️ Fresh & Homemade Everyday
        </div>
        <h1 className="text-5xl font-extrabold text-orange-800 drop-shadow-sm">Welcome to</h1>
        <h2 className="text-5xl font-extrabold text-[#7c3a00] mt-2 drop-shadow-sm">Mamta Bhojnalaya</h2>
        <p className="text-gray-700 mt-4 text-lg max-w-xl mx-auto">
          Serving love on a plate since 1998 – enjoy wholesome meals just like home.
        </p>
        <p className="text-orange-700 font-medium mt-2 italic">
          ✨ Today's Special: Paneer Butter Masala + Jeera Rice ✨
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-6 px-8 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition duration-300 text-lg shadow-md"
        >
          Explore Menu
        </button>
      </div>

      {/* Restaurant Image */}
      <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg mb-16">
        <img
          src={restaurantImg}
          alt="Mamta Bhojnalaya restaurant"
          className="w-full h-[450px] object-cover"
        />
      </div>

      {/* Why Choose Us */}
      <section className="mt-8 mb-20 max-w-5xl mx-auto px-2">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "👪 Homely Taste",
              desc: "Feel the comfort of home-cooked meals with every bite.",
            },
            {
              title: "💸 Affordable",
              desc: "Get delicious, filling meals at student-friendly prices.",
            },
            {
              title: "🫱🏽‍🫲🏾 Trusted Since 1998",
              desc: "Over two decades of serving satisfied customers.",
            },
          ].map((box, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2 text-orange-700">{box.title}</h4>
              <p className="text-gray-600 text-sm">{box.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="mt-8 mb-20 max-w-6xl mx-auto px-2">
  <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Popular Dishes</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        name: "Paneer Butter Masala",
        img: paneerButterMasalaImg,
      },
      {
        name: "Dal Tadka",
        img: dalTadkaImg,
      },
      {
        name: "Matar Paneer",
        img: matarPaneerImg,
      },
      {
        name: "Tandoori Roti",
        img: tandooriRotiImg,
      },
    ].map((dish, index) => (
      <div
        key={index}
        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-left"
      >
        <img
          src={dish.img}
          alt={dish.name}
          className="rounded mb-3 h-32 w-full object-cover"
        />
        <h4 className="font-semibold text-lg text-orange-800">{dish.name}</h4>
      </div>
    ))}
  </div>
</section>


      {/* Testimonials */}
      <section className="mt-8 mb-20 max-w-4xl mx-auto px-2">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">What Customers Say</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              quote:
                '"Feels just like eating at home! The dal and rice combo is my favorite."',
              name: "- Aarti S., Regular Customer",
            },
            {
              quote: '"Great value, amazing thalis. I always bring my friends here."',
              name: "- Ramesh P., Student",
            },
          ].map((testi, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow text-left">
              <p className="italic text-gray-600 mb-2">{testi.quote}</p>
              <p className="text-sm font-semibold text-right text-orange-700">{testi.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="mt-8 mb-10 max-w-2xl mx-auto px-2 text-gray-700 text-lg">
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">About Us</h3>
        <p className="leading-relaxed">
          Mamta Bhojnalaya is a family-run eatery serving wholesome, home-style Indian meals since 1998.
          We pride ourselves on authentic recipes, warm hospitality, and budget-friendly thalis.
        </p>
      </section>
    </div>
  );
}
