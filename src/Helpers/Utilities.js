export class Utilities
{
    static RandomNumber(max, min = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static GenerateQuestion(min, max) {
    const question = {};
    question.firstNum = Utilities.RandomNumber(max, min);
    question.secondNum = Utilities.RandomNumber(10);
    question.answer = question.firstNum * question.secondNum;
    return question;
  }
}

