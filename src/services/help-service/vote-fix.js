function VoteFix(grade) {
  if (grade === 10) {
    return grade;
  } else {
    return grade.toFixed(1);
  }
}
export default VoteFix;
