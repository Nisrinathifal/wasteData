import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Array "mo:base/Array";

actor {

    type WasteData = {
        id: Nat;
        wasteType: Text;
        quantity: Nat;
        createdAt: Time.Time;
    };

    var wasteStore: [WasteData] = [];

    var idCounter: Nat = 0;

    public func createWaste(wasteType: Text, quantity: Nat): async WasteData {
        idCounter += 1;
        let newWaste: WasteData = {
            id = idCounter;
            wasteType = wasteType;
            quantity = quantity;
            createdAt = Time.now();
        };
        wasteStore := Array.append(wasteStore, [newWaste]);
        return newWaste;
    };

    public query func getWasteById(id: Nat): async ?WasteData {
    let waste = Array.find<WasteData>(wasteStore, func(w: WasteData): Bool { w.id == id });
    switch waste {
        case (null) {
            return null;
        };
        case (?foundWaste) {
            return ?foundWaste; 
        };
    }
  };

    public query func listAllWaste(): async [WasteData] {
        return wasteStore;
    };

}