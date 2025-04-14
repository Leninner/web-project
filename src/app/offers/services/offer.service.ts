import { Injectable, signal } from "@angular/core";


interface Offer {
  id: number;
  name: string;
  description?: string; 
  discount?: number;
  startDate?: Date;
  endDate?: Date;

}

@Injectable({
  providedIn: "root",
})
export class OfferService {
  private offers = signal<Offer[]>([
    {
      id: 1,
      name: "Oferta de Verano",
      description: "Descuentos increíbles en todos nuestros productos.",
      discount: 0.2,
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-30"),
    },
    {
      id: 2,
      name: "Promoción de Primavera",
      description: "Llévate un segundo artículo con un 50% de descuento.",
      discount: 0.5,
      startDate: new Date("2025-03-15"),
      endDate: new Date("2025-04-30"),
    },
    {
      id: 3,
      name: "Liquidación de Temporada",
      description: "Últimas unidades a precios de remate.",
      discount: 0.3,
      startDate: new Date("2025-05-01"),
      endDate: new Date("2025-05-15"),
    },
  ]);

  getOffers(): Offer[] {
    return this.offers();
  }

  addOffer(offer: Offer) {
    this.offers.set([...this.offers(), { ...offer, id: this.generateId() }]);
  }

  updateOffer(updatedOffer: Offer) {
    const updatedOffers = this.offers().map((offer) =>
      offer.id === updatedOffer.id ? updatedOffer : offer
    );
    this.offers.set(updatedOffers);
  }

  deleteOffer(id: number) {
    const updatedOffers = this.offers().filter((offer) => offer.id !== id);
    this.offers.set(updatedOffers);
  }

  // Función auxiliar para generar un ID único (simple para este ejemplo)
  private generateId(): number {
    return this.offers().length > 0
      ? Math.max(...this.offers().map((offer) => offer.id)) + 1
      : 1;
  }
}
