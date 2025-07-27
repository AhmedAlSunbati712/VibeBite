import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importing react components
import SubmitButton from "./SubmitButton";

function PromptInput(props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="container prompt-container"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <input
            type="text"
            placeholder="What's your mood or vibe today?"
            value={props.prompt}
            onChange={(e) => props.setPrompt(e.target.value)}
            className="input"
          />
          <br />
          <SubmitButton handleSubmit={props.handleSubmit} loading={props.loading} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromptInput;
