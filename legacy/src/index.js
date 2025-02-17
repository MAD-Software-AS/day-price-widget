import { getDataById, initFirebaseServices } from "./firebase";

import { generateReservations } from "./reservations";
import { generateSalonsSelect } from "./salonsSelect";
import { getWidgetSkeletonShadowNode } from "./widgetSkeleton";

(function () {
  function initWidget() {
    const shadowNode = getWidgetSkeletonShadowNode();
console.log('start')
    const firebaseScript = document.createElement("script");
    firebaseScript.src =
      "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"; // Firebase App SDK
    shadowNode.appendChild(firebaseScript);

    const firestoreScript = document.createElement("script");
    firestoreScript.src =
      "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"; // Firestore SDK
    shadowNode.appendChild(firestoreScript);

    firebaseScript.onload = () => {
      firestoreScript.onload = async () => {
        const { db } = initFirebaseServices();
        const dayPriceData = await getDataById({
          db,
          collectionName: "dayPrices",
          id: "a9XSDat68cb1pxmwPCzg",
        });
        const salonsToDayPricesList = Object.entries(
          dayPriceData.dayPriceConfig
        );
        const selectedSalonDayPrices = Object.values(
            dayPriceData.dayPriceConfig[salonsToDayPricesList[0][0]]
        )[0];
        generateReservations({
          shadowNode,
          salonReservationPrice: selectedSalonDayPrices,
        });
        generateSalonsSelect({
          shadowNode,
          selectedSalonName: salonsToDayPricesList[0][0],
          salonNames: Object.keys(dayPriceData.dayPriceConfig)
        });
      };
    };
  }

  window.addEventListener("load", initWidget);
})();
