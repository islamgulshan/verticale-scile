import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmbeddingService {
  /**
   * Converts text to a deterministic, normalized vector of given dimension.
   * Returns a zero-vector if input is empty or not provided.
   */
  textToVector(txt: string = '', dim = 6): number[] {
    if (typeof txt !== 'string') {
      throw new BadRequestException('Invalid text provided for embedding.');
    }
    if (txt.length === 0) {
      // Return a zero-vector when no text is provided
      return Array(dim).fill(0);
    }
    const vals = Array.from(
      { length: dim },
      (_, i) => (txt.charCodeAt(i % txt.length) * 17 + i) % 97,
    );
    const len = Math.hypot(...vals);
    return vals.map((v) => v / len);
  }
}
