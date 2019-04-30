export interface PageRequest {

  /**
   * The page index (e.g. 0 = first page, 1 = second page, etc.)
   */
  index: number;

  /**
   * The number of entries for the page requested (e.g. 10, 25, 100, etc.)
   */
  size;
}
