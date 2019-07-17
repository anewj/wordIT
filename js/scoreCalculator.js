let total = 0;

/**
 * Calculate score of a word
 *
 * @param initial
 * @param entered
 * @returns {number}
 */
function calculateInputScore(initial, entered) {
    let score = entered.length - initial.length;
    total += score;
    return score
}