import { useEffect, useState } from "react";

function App() {
  const [stars, setStars] = useState([]);
  const [shootings, setShootings] = useState([]);

  useEffect(() => {
    const numStars = 100;
    const generatedStars = [];

    for (let i = 0; i < numStars; i++) {
      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = 10 + Math.random() * 10;
      const travel = 100 + Math.random() * 100;

      generatedStars.push({ id: i, size, left, delay, duration, travel });
    }

    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      const newShooting = { id, top, left };
      setShootings((prev) => [...prev, newShooting]);

      setTimeout(() => {
        setShootings((prev) => prev.filter((s) => s.id !== id));
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-0 w-full h-screen overflow-hidden bg-gradient-to-b from-black via-indigo-950 to-violet-950 text-white">
      <div
        className="nebula"
        style={{
          top: "10%",
          left: "20%",
        }}
      ></div>

      <div
        className="nebula"
        style={{
          bottom: "10%",
          right: "15%",
        }}
      ></div>

      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `-${star.size * 2}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            animationName: "star-move, twinkle",
            "--travel": `${star.travel}vh`,
          }}
        />
      ))}

      {shootings.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-4xl font-bold bg-transparent glow-text">
          ✨ Star Field ✨
        </h1>
      </div>
    </div>
  );
}

export default App;
