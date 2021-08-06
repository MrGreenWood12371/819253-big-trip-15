export const createTripPriceTemplate = (tripPoints) => {
  let tripCost = 0;

  tripPoints.forEach((element) => {
    tripCost += element.basePrice;
  });

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
</p>`;
};
