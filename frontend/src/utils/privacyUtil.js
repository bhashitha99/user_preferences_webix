import { fetchData } from "./api";

export async function reloadPrivacySettings() {
  const API_URL = import.meta.env.VITE_API_URL;
  const privacySettings = await fetchData(`${API_URL}/api/privacy-settings/`);

  const privacyFields = [
    "profileVisibility", "profilePictureVisibility", "contactVisibility", "requestConnection",
    "followConnection", "suggestionsConnection", "messagePermission", "mentionPermission",
    "discoverableData", "activeStatusData", "lastSeenData"
  ];

  privacyFields.forEach((field) => {
    if ($$(field)) {
      $$(field).setValue(privacySettings[field]);
      $$(field).refresh();
    }
  });
}