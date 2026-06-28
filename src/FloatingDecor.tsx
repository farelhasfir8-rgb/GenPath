import { Compass, Leaf, Sparkle, Star } from "lucide-react";
import { motion } from "framer-motion";

const floatingItems = [
  { className: "decor-1", icon: Compass, duration: 7 },
  { className: "decor-2", icon: Star, duration: 5.5 },
  { className: "decor-3", icon: Leaf, duration: 6.5 },
  { className: "decor-4", icon: Sparkle, duration: 4.8 },
  { className: "decor-5", icon: Star, duration: 7.4 },
];

function FloatingDecor() {
  return (
    <div className="floating-decor" aria-hidden="true">
      {floatingItems.map(({ className, icon: Icon, duration }) => (
        <motion.span
          className={`floating-token ${className}`}
          key={className}
          animate={{
            y: [0, -16, 0],
            rotate: [0, 7, -5, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={22} />
        </motion.span>
      ))}
      <motion.span
        className="soft-cloud cloud-1"
        animate={{ x: [0, 24, 0], y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="soft-cloud cloud-2"
        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default FloatingDecor;

