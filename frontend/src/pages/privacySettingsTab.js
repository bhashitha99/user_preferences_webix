import "../styles/settings.css";
import { sendUpdate } from "../utils/api.js";
import { isValidPassword, isValidEmail } from "../utils/validations.js";
import { boxWithEditPermission,boxWithoutEditPermission,editpassword } from "../components/formFields.js";
import { saveFormData, fetchData } from "../utils/api.js";

const API_URL = import.meta.env.VITE_API_URL;

function isMobile() {
  return window.innerWidth < 768;
}

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


function getTabHeader(iconClass, label) {
  if (isMobile()) {
    return `<span class='webix_icon ${iconClass}'></span>`;
  } else {
    return `<span class='webix_icon ${iconClass}'></span> ${label}`;
  }
}

// Responsive layout
function responsiveLayout(items) {
  if (window.innerWidth < 1050){
    return { rows: items };
  }
  else if (window.innerWidth < 768) {
    return { rows: items };
  }
  else {
    return { cols: items };
  }
}


const privacyInitialValues= {
    profileVisibility: "friends",
    profilePictureVisibility: "friends",
    contactVisibility: "only_me",
    requestConnection: "everyone",
    followConnection: "everyone",
    suggestionsConnection: "friends",
    messagePermission: "friends",
    mentionPermission: "everyone",
    discoverableData: 1,
    activeStatusData: 1,
    lastSeenData: "friends",
}




export function getPrivacySettingsTab() {
  return {
    header: getTabHeader("fas fa-solid fa-shield-alt", "Privacy Settings"),
    body: {
      view: "form",
      scroll: "y",
      id: "privacyForm",
      elements: [
        { rows: [
          
          {
            ...responsiveLayout([
            { height: 200,
              rows:[
              {view: "template", 
                template: "Profile Visibility", 
                type: "section", 
                css: "section-header"
              },
                boxWithoutEditPermission("Who can view your full profile", "profileVisibility", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
                boxWithoutEditPermission("Who can see your profile picture", "profilePictureVisibility", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
                boxWithoutEditPermission("Who can see your contact info", "contactVisibility", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
              ]},{
                height: 200,
                rows:[
              {view: "template", 
                template: "Connection Controls", 
                type: "section", 
                css: "section-header"
              },
                boxWithoutEditPermission("Who can send you connection requests", "requestConnection", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
                boxWithoutEditPermission("Who can follow you", "followConnection", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
                boxWithoutEditPermission("Allow connection suggestions", "suggestionsConnection", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
              ]},   
            ])
          },
          {
            ...responsiveLayout([
            { height: 200,
              rows:[
              {view: "template", 
                template: "Contact Permissions", 
                type: "section", 
                css: "section-header"
              },
                boxWithoutEditPermission("Who can message you", "messagePermission", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
                boxWithoutEditPermission("Allow group mentions", "mentionPermission", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
              ]},{
                height: 200,
                rows:[
              {view: "template", 
                template: "Data Sharing Preferences", 
                type: "section", 
                css: "section-header"
              },
                boxWithoutEditPermission("Make My Profile Discoverable", "discoverableData", "switch", 1, 300,200),
                boxWithoutEditPermission("Display my active status", "activeStatusData", "switch",1, 300,200),
                boxWithoutEditPermission("who can see your last active time", "lastSeenData", "select", [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "only_me", value: "Only Me" }
                            ], 300,200),
              ]},   
            ])
          },
        ]},
        {
        cols: [
                // {},
                {
                  view: "button",
                  value: "Reset",
                  css: "webix_secondary reset-button",
                  click: function () {
                    webix.confirm({
                      title: "Reset Confirmation",
                      ok: "Yes, Reset",
                      cancel: "Cancel",
                      text: "Are you sure you want to reset all privacy settings?",
                      callback: function(result) {
                        if (result) {
                          saveFormData(
                            `${API_URL}/api/privacy-settings/`,
                            privacyInitialValues
                          )
                          reloadPrivacySettings();
                          webix.message("Privacy settings reset.");
                        }
                      }
                    });
                  }
                },
                // {},
                {
                  view: "button",
                  value: "Save Changes",
                  type: "form",
                  css: "webix_primary save-button",
                  click: function () {
                    webix.confirm({
                      title: "Confirm Save",
                      ok: "Yes, Save",
                      cancel: "Cancel",
                      text: "Are you sure you want to save these privacy settings?",
                      callback: function(result) {
                        if (result) {
                          saveFormData(
                            `${API_URL}/api/privacy-settings/`,
                            $$("privacyForm").getValues())
                            .then(() => {
                              webix.message("Privacy settings saved successfully!");
                            })
                            .catch(err => {
                              webix.message({ type: "error", text: "Failed to save changes: " + err });
                            });
                        }
                      }
                    });
                  }
                }
                ,
                // {}
              ]
      }

      ]
    }
  };
}