import { auth } from './auth';
import { attribute } from './attribute';
import { brand } from './brand';
import { cart } from './cart';
import { category } from './category';
import { option } from './option';
import { product } from './product';
import { shopMetadata  } from './shopMetadata';
import { payment } from './stripe';

export default {
  ...auth,
  ...shopMetadata,
  ...attribute,
  ...brand,
  ...cart,
  ...category,
  ...option,
  ...product,
  ...payment,
};