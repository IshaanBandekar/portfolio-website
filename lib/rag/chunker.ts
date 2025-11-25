export function chunkText(
    text: string,
    chunkSize = 800,
    overlap = 150
  ): string[] {
    // Normalize newlines and trim trailing spaces to make boundary detection easier
    const normalized = text.replace(/\r\n?/g, "\n").replace(/[\t ]+$/gm, "");

    // Split into logical blocks: headers, paragraphs, and bullet groups
    // A block is separated by at least one blank line
    const rawBlocks = normalized
      .split(/\n{2,}/)
      .map((b) => b.trim())
      .filter(Boolean);

    // Further split blocks that are long bullet lists into groups to avoid breaking single bullets across chunks
    const blocks: string[] = [];
    for (const b of rawBlocks) {
      // If it contains multiple bullet lines, group contiguous bullets together
      const lines = b.split(/\n/);
      let group: string[] = [];
      const flush = () => {
        if (group.length) {
          blocks.push(group.join("\n"));
          group = [];
        }
      };
      let inBullets = false;
      for (const line of lines) {
        const isBullet = /^\s*[-•]\s+/.test(line);
        if (isBullet) {
          inBullets = true;
          group.push(line);
        } else {
          if (inBullets) {
            // End of bullet group
            flush();
            inBullets = false;
          }
          blocks.push(line);
        }
      }
      flush();
    }

    // Now pack blocks into chunks under chunkSize, preferring to break at block boundaries.
    const chunks: string[] = [];
    let current = "";
    for (const block of blocks) {
      const candidate = current ? `${current}\n\n${block}` : block;
      if (candidate.length <= chunkSize) {
        current = candidate;
      } else {
        if (current) {
          chunks.push(current.trim());
        }
        // If a single block is bigger than chunkSize, fall back to safe slicing with soft overlap
        if (block.length > chunkSize) {
          let start = 0;
          while (start < block.length) {
            const end = Math.min(start + chunkSize, block.length);
            const slice = block.slice(start, end).trim();
            if (slice) chunks.push(slice);
            if (end >= block.length) break;
            start = Math.max(start + 1, end - overlap);
          }
          current = "";
        } else {
          current = block;
        }
      }
    }
    if (current) chunks.push(current.trim());

    return chunks;
  }