export default class Helper
{
  static getRandomNumberByRange(range: number): number
  {
    return Math.floor(Math.random() * range);
  }
}
