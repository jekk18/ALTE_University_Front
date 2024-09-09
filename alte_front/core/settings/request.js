import axios from "axios";


export const fetchSettingsData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/settings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return null;
  }
};

export const settings = {
  submissionGeneralEmail: 1,
  footerEmail: 2,
  footerPhone: 3,
  facebookLink: 4,
  twitterLink: 5,
  instagramLink: 6,
  linkdinLink: 23,
  youtubeLink:25,
  footerAddress: 7,
  myAlteButton: 8,
  infoButton: 9,
  googleMapsKey: 10,
  googleAnalyticsKey: 11,
  infoButtonLink: 12,
  myAlteButtonlink: 13,
  homepageYoutubeVideoID: 14,
  paginationNews: 15,
  paginationEvents: 16,
  paginationGeneralLists: 17,
  paginationPublication: 18,
  paginationFAQ: 19,
  paginationTeam: 20,
  paginationPhotoVideoGallery: 21,
  fileValidation: 22,
  CookieText: 24,
  messengerAppId: 26,
  messengerPageId: 27,
  messengerHtmlRef: 28,
}