import React from "react";

interface GradientTextProps {
  text: string;
  as?: React.ElementType; 
  className?: string;
}

export default function GradientText({ text, as: Tag = "h2", className = "" }: GradientTextProps) {
  const goldGradient = "linear-gradient(45deg, #A88F3A, #FFD700 30%, #F9E79F 50%, #FFD700 70%, #A88F3A)";

  return (
    <Tag 
      className={`font-serif font-bold text-transparent bg-clip-text ${className}`}
      style={{ 
        backgroundImage: goldGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      {text}
    </Tag>
  );
}