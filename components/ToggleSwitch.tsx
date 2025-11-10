import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange }) => {
  const toggleSwitch = () => onChange(!checked);

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggleSwitch}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
        checked ? 'bg-indigo-600' : 'bg-gray-600'
      }`}
    >
      <span className="sr-only">Toggle</span>
      <motion.span
        layout
        transition={spring}
        className={`inline-block w-4 h-4 transform bg-white rounded-full ${
            checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
