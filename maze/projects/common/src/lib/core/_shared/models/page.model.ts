export interface Page<TData> {

  /**
   * The data
   */
  data: TData[];

  /**
   * The page index (e.g. 0 = first page, 1 = second page, etc.)
   */
  index: number;

  /**
   * The number of entries for the page requested (e.g. 10, 25, 100, etc.)
   * Note: this number may be bigger than the length of the data array if this is the last page of data
   */
  size;

  /**
   * The total number of items in the data store
   */
  totalItemCount: number;
}
