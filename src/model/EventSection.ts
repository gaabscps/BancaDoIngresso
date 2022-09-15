import Combo from './Combo';
import EventSectionGet from './EventSectionGet';
import Product from './Product';
import Section from './Section';

export default interface EventSection {
  section: Section;
  products: Product[];
  combos: Combo[];
}

export const parseEventSectionGet = (
  eventSectionGet: EventSectionGet[] | undefined,
): EventSection[] | undefined => {
  if (eventSectionGet && eventSectionGet.length > 0) {
    const list: EventSection[] = [];
    eventSectionGet.forEach(data => {
      let products: Product[] | undefined;
      if (data.products && data.products.length > 0) {
        products = [];
        data.products.forEach(p => {
          const product: Product = {
            id: p.id,
            name: p.name,
            imageBase64: p.imageBase64,
          };
          products?.push(product);
        });
      }
      let combos: Combo[] | undefined;
      if (data.combos && data.combos.length > 0) {
        combos = [];
        data.combos.forEach(c => {
          const combo: Combo = {
            id: c.id,
            name: c.name,
            imageBase64: c.imageBase64,
          };
          combos?.push(combo);
        });
      }
      const eventSection: EventSection = {
        section: data.section,
        products: products as Product[],
        combos: combos as Combo[],
      };
      list.push(eventSection);
    });
    return list;
  }
  return undefined;
};
