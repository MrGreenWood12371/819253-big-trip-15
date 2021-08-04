import dayjs from 'dayjs';

export const createTripRoadInfoTemplate = (tripPoints) => {
  const {dateFrom} = tripPoints[0];
  const {dateTo} = tripPoints[tripPoints.length-1];
  const tripDestinations = [];
  tripPoints.forEach((element) => {
    tripDestinations.push(element.destination.name);
  });

  const generateTripDestinationTemplate = () => {
    let tripDestinationTemplate;

    if (tripDestinations.length <= 3) {
      tripDestinationTemplate = tripDestinations.join(' &mdash; ');
    }
    else {
      tripDestinationTemplate = `${tripDestinations[0]} &mdash; ... &mdash; ${tripDestinations[tripDestinations.length-1]}`;
    }

    return tripDestinationTemplate;
  };

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${generateTripDestinationTemplate()}</h1>

    <p class="trip-info__dates">${dayjs(dateFrom).format('D MMM')} &mdash; ${dayjs(dateTo).format('D MMM')}</p>
  </div>
</section>`;
};
