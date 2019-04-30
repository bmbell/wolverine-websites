import { TestBed, inject } from "@angular/core/testing";

import { StringService } from "./string.service";

describe("String Service", () => {

  let s: StringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(inject([StringService], (stringService: StringService) => {
    s = stringService;
  }));

  it(`should compile`, inject([StringService], (stringService: StringService) => {
    expect(stringService).toBeTruthy();
  }));

  it("should replace all substrings with the replacement string",
    () => {

    const input = "Cows go moo. Ducks go quack. Ducks do not moo.";

    let result = s.replaceAll(input, " Ducks do not moo.", "");
    expect(result).toBe("Cows go moo. Ducks go quack.");

    result = s.replaceAll(input, "moo", "mooooo");
    expect(result).toBe("Cows go mooooo. Ducks go quack. Ducks do not mooooo.");

  });

  it("should strip all whitespace from the input string",
      () => {

      let input = "Cows go moo.";

      expect(s.stripWhitespace(input)).toBe("Cowsgomoo.");

      input = " Cows go moo. ";
      expect(s.stripWhitespace(input)).toBe("Cowsgomoo.");

      input = "    ";
      expect(s.stripWhitespace(input)).toBe("");

  });

  it("should indicate empty strings",
    () => {

      let input = "IsNotEmpty";
      expect(s.isEmpty(input)).toBe(false);

      input = " Is not empty ";
      expect(s.isEmpty(input)).toBe(false);

      input = "";
      expect(s.isEmpty(input)).toBe(true);

      input = " ";
      expect(s.isEmpty(input)).toBe(true);

      input = "        ";
      expect(s.isEmpty(input)).toBe(true);

  });

  it("should indicate alpha-only strings",
    () => {

      let input = "alphaOnly";
      expect(s.isAlpha(input)).toBe(true);

      input = " alphaOnly ";
      expect(s.isAlpha(input)).toBe(false);

      input = "alpha#moreAlpha";
      expect(s.isAlpha(input)).toBe(false);

      input = "123alpha";
      expect(s.isAlpha(input)).toBe(false);

      input = "alpha123";
      expect(s.isAlpha(input)).toBe(false);

      input = "alpha123alpha";
      expect(s.isAlpha(input)).toBe(false);

  });

  it("should indicate alpha-numeric-only strings",
    () => {

      let input = "alphaOnly";
      expect(s.isAlphaNumeric(input)).toBe(true);

      input = " alphaOnly ";
      expect(s.isAlphaNumeric(input)).toBe(false);

      input = "alpha#moreAlpha";
      expect(s.isAlphaNumeric(input)).toBe(false);

      input = "123alpha";
      expect(s.isAlphaNumeric(input)).toBe(true);

      input = "alpha123";
      expect(s.isAlphaNumeric(input)).toBe(true);

      input = "alpha123alpha";
      expect(s.isAlphaNumeric(input)).toBe(true);
  });

  it("should indicate numeric-only strings",
    () => {

      let input = "123";
      expect(s.isNumeric(input)).toBe(true);

      input = " 123 ";
      expect(s.isNumeric(input)).toBe(false);

      input = "alpha#moreAlpha";
      expect(s.isNumeric(input)).toBe(false);

      input = "123alpha";
      expect(s.isNumeric(input)).toBe(false);

      input = "alpha123";
      expect(s.isNumeric(input)).toBe(false);

      input = "alpha123alpha";
      expect(s.isNumeric(input)).toBe(false);
  });

  it("should indicate lowercase-only strings",
    () => {

      let input = "lowercase";
      expect(s.isLower(input)).toBe(true);

      input = " lowercase ";
      expect(s.isLower(input)).toBe(false);

      input = "lowerUPPER";
      expect(s.isLower(input)).toBe(false);

      input = "UPPER";
      expect(s.isLower(input)).toBe(false);

      input = "UPPERlower";
      expect(s.isLower(input)).toBe(false);

      input = "lower123";
      expect(s.isLower(input)).toBe(false);

      input = "lower#";
      expect(s.isLower(input)).toBe(false);
  });

  it("should indicate uppercase-only strings",
    () => {

      let input = "UPPERCASE";
      expect(s.isUpper(input)).toBe(true);

      input = " UPPERCASE ";
      expect(s.isUpper(input)).toBe(false);

      input = "lowerUPPER";
      expect(s.isUpper(input)).toBe(false);

      input = "lower";
      expect(s.isUpper(input)).toBe(false);

      input = "UPPERlower";
      expect(s.isUpper(input)).toBe(false);

      input = "UPPER123";
      expect(s.isUpper(input)).toBe(false);

      input = "UPPER#";
      expect(s.isUpper(input)).toBe(false);
  });

  it("should indicate whether the input string starts with a particular substring",
    () => {

      const input = "Cows go moo.";

      expect(s.startsWith(input, "C")).toBe(true);
      expect(s.startsWith(input, "Cows")).toBe(true);
      expect(s.startsWith(input, "Cows s")).toBe(false);
      expect(s.startsWith(input, "go")).toBe(false);
      expect(s.startsWith(input, "moo.")).toBe(false);
      expect(s.startsWith(input, "Cows go moo.")).toBe(true);
  });

  it("should indicate whether the input string ends with a particular substring",
    () => {

      const input = "Cows go moo.";

      expect(s.endsWith(input, ".")).toBe(true);
      expect(s.endsWith(input, "moo.")).toBe(true);
      expect(s.endsWith(input, "go moo.")).toBe(true);
      expect(s.endsWith(input, "Cows")).toBe(false);
      expect(s.endsWith(input, "go ")).toBe(false);
      expect(s.endsWith(input, "Cows go moo.")).toBe(true);
  });

  it("should indicate whether the input string contains a particular substring",
    () => {

      const input = "Cows go moo.";

      expect(s.contains(input, "Cows")).toBe(true);
      expect(s.contains(input, "go")).toBe(true);
      expect(s.contains(input, "go moo.")).toBe(true);
      expect(s.contains(input, "Cowss")).toBe(false);
      expect(s.contains(input, "go moo!")).toBe(false);
      expect(s.contains(input, "Cows go moo.")).toBe(true);
  });

  it("should be able to splice strings together", () => {

    const input = "Cows go moo.";

    expect(s.splice(input, 0, 4, "Ducks")).toBe("Ducks go moo.");
    expect(s.splice(input, 8, 4, "quack?")).toBe("Cows go quack?");
    expect(s.splice(input, 5, 0, "don't ")).toBe("Cows don't go moo.");
    expect(s.splice(input, 4, 3, "")).toBe("Cows moo.");
  });

  it("should allow inserting one string into another", () => {

    const part1 = "Cows go ";
    const part2 = "moo";

    expect(s.insert(part1, 8, part2)).toBe("Cows go moo");
    expect(s.insert(part1, 0, part2)).toBe("mooCows go ");
    expect(s.insert(part1, 5, part2)).toBe("Cows moogo ");
  });

});
