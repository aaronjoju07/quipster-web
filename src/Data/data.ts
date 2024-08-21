// Define the interface for the user data with sentiment
interface UserDataEntry {
    id: number;
    year: number;
    userGain: number;
    userLost: number;
    sentiment: 'positive' | 'negative';
  }
  
  // Define the UserData array with sentiment labels
  export const UserData: UserDataEntry[] = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
      sentiment: 'positive',
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
      sentiment: 'positive',
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
      sentiment: 'positive',
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
      sentiment: 'negative',
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
      sentiment: 'positive',
    },
  ];
  