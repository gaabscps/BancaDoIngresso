import EventProduct from './EventProduct';
import EventProductCombo from './EventProductCombo';
import Section from './Section';

export default interface EventSectionGet {
  section: Section;
  products: EventProduct[];
  combos: EventProductCombo[];
}
