/**
 * Topic: AI Engineering CAPSTONE — ties together 22, 23, 24
 *
 * Build a tiny end-to-end RAG (Retrieval-Augmented Generation)
 * pipeline from the pieces you've already built:
 *   - chunkText         (23-text-chunker.js)
 *   - cosineSimilarity / findTopK  (24-vector-search.js)
 *   - renderPrompt      (22-prompt-template.js)
 *
 * Implement buildRagAnswer(documents, query, embedFn, mockLLM):
 *   - `documents` is an array of raw text strings (e.g. home listing
 *     descriptions).
 *   - Step 1: chunk EVERY document with chunkText(doc, 50, 10).
 *   - Step 2: embed every chunk with `embedFn(chunkText)` (async),
 *     producing { text, vector } for each chunk.
 *   - Step 3: embed the `query` the same way.
 *   - Step 4: use findTopK to get the top 2 most relevant chunks to
 *     the query's embedding.
 *   - Step 5: build a prompt using renderPrompt with a template like:
 *       "Context:\n{{context}}\n\nQuestion: {{question}}\nAnswer:"
 *     where {{context}} is the top-2 chunks joined by "\n---\n".
 *   - Step 6: call `mockLLM(prompt)` (async) and return its result.
 *
 * This is a real, if simplified, RAG pipeline: retrieve relevant
 * context via embeddings, then ask an LLM to answer GROUNDED in that
 * retrieved context, instead of just answering from its own training
 * data alone.
 */

async function buildRagAnswer(documents, query, embedFn, mockLLM) {
  // TODO: implement (use chunkText, cosineSimilarity/findTopK, renderPrompt)
  throw new Error("not implemented");
}

module.exports = { buildRagAnswer };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    const documents = [
      "Beach Villa in Goa has 3 bedrooms, a private pool, and is 2 minutes from the beach. Pet friendly.",
      "Mountain Cabin in Manali has 2 bedrooms, a fireplace, and stunning snow views. No pets allowed.",
    ];

    // Fake embedding: just count how many words overlap with a fixed
    // vocabulary, so "similar topic" text gets a "similar" vector.
    const vocab = ["beach", "pool", "pet", "mountain", "cabin", "snow", "fireplace"];
    const embedFn = async (text) => {
      const lower = text.toLowerCase();
      return vocab.map((word) => (lower.includes(word) ? 1 : 0));
    };

    const mockLLM = async (prompt) => {
      // A real LLM would read the prompt's context and answer from it.
      // Our mock just confirms the right context made it into the prompt.
      if (prompt.includes("pool") && prompt.includes("Pet friendly")) {
        return "Yes, the Beach Villa has a private pool and is pet friendly.";
      }
      return "I don't know.";
    };

    const answer = await buildRagAnswer(documents, "Does the beach home have a pool and allow pets?", embedFn, mockLLM);
    console.log("Answer:", answer);

    const pass = answer === "Yes, the Beach Villa has a private pool and is pet friendly.";
    console.log(pass ? "PASS" : "FAIL");
  })();
}
