
  class Traffic {   // Traffic status
    viewAlertOne() {
      console.log("There is traffic.");
    }
    viewAlertTwo() {
      console.log("There is minimal traffic.");
    }
    viewAlertThree() {
      console.log("There is no traffic.");
    }
  }

  const alert = new Traffic();  // Alert that can be viewed

  class Roads {
    unaffectedRoads(roadName, roadLocation, roadLength) {
      this.roadName = roadName;
      this.roadLocation = roadLocation;
      this.roadLength = roadLength;   // Length of road is measured in kilometers
    }

    roadTrafficStatus() {
      console.log(`${this.roadName} has no traffic.`);
    }
  }

  // Examples of roads with no traffic
  const road1 = new Roads("Limuru Road", "Parklands", 6.4);
  const road2 = new Roads("Elgeyo Maraquet", "Hurligham", 0.8);
  const road3 = new Roads("Kiambu Road", "Kiambu", 7.1);

  class DiversionInfo {   // Tells the user which alternate roots to use to avoid traffic and arrive at destination
    diversionInformation(roadName, roadLocation, distance) {
      this.roadName = roadName;
      this.roadLocation = roadLocation;
      this.distance = distance;   // Distance is measured in meters
    }

    newRoute() {
      console.log(`Take ${roadName} in ${roadLocation}, ${distance} meters from your current location.`);
    }
  }

  // Examples of diversion roads to use if user wants to avoid traffic
  const divRoad1 = new DiversionInfo("Northern Bypass Rd", "Kiambu", 350);
  const divRoad2 = new DiversionInfo("United Nations Ave", "UN", 200);
  const divRoad3 = new DiversionInfo("Magnolia Close", "Kitisuru", 600);
