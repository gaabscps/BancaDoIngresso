import Combo from './Combo';
import Product from './Product';
import Section from './Section';

export default interface EventSection {
  section: Section;
  products: Product[];
  combos: Combo[];
}
