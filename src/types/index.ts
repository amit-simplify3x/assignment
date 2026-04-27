export interface ItemProp {
  label: string;
  value: string;
}

export interface CatalogItem {
  itemname: string;
  category: string;
  image: string;
  itemprops: ItemProp[];
}
