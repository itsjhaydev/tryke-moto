export type UserRole = "passenger" | "driver";

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "passenger";
  avatarUrl?: string;
  createdAt: Date;
}

export interface Driver extends Passenger {
  role: "driver";
  todaName: string;
  todaNumber: string;
  registrationNumber: string;
  documents: {
    licenseFrontUrl: string;
    licenseBackUrl: string;
    orUrl: string;
    crUrl: string;
    tricyclePhotos: {
      front: string;
      back: string;
      side: string;
      interior: string;
    };
  };
}
