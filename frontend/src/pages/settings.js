import "../styles/settings.css";
import { sendUpdate } from "../utils/api.js";
import { isValidPassword, isValidEmail } from "../utils/validations.js";
import {
  boxWithEditPermission,
  boxWithoutEditPermission,
  editpassword,
} from "../components/formFields.js";
import { getProfileSettingsTab } from "./profileSettingsTab.js";
import { getNotificationSettingsTab } from "./notificationSettingsTab.js";
import { getPrivacySettingsTab } from "./privacySettingsTab.js";
import { getThemeSettingsTab } from "./themeSettingsTab.js";
import { navbar } from "../components/navbar.js";

const API_URL = import.meta.env.VITE_API_URL;

function isMobile() {
  return window.innerWidth < 768;
}

export async function saveFormData(formId, url, validateFn) {
  const form = $$(formId);
  const values = form.getValues();
  console.log("Form values to save:", values);
  // Validate if validation function is provided
  if (validateFn && !validateFn(values)) {
    return Promise.reject("Validation failed");
  }
  // Send the data to backend
  return sendUpdate(url, values);
}

//  Create a reusable tabview
function createTabview() {
  return {
    view: "tabview",
    id: "mainTabview",
    cells: [
      getProfileSettingsTab(),
      getNotificationSettingsTab(),
      getPrivacySettingsTab(),
      getThemeSettingsTab(),
    ],
  };
}

// Main layout
export function settingsPage() {
  const layout = {
    rows: [
      navbar(),
      {
        cols: [
          {
            rows: [createTabview()],
          },
        ],
      },
    ],
  };

  // Delay layout enhancements slightly after render
  setTimeout(() => {
    loadProfileData();

    // Handle resize to rebuild tabview
    window.addEventListener("resize", () => {
      const parent = $$("mainTabview")?.getParentView();
      if (parent) {
        const index = parent.index($$("mainTabview"));
        parent.removeView("mainTabview");
        parent.addView(createTabview(), index);
        loadProfileData();
      }
    });
  }, 0);

  return layout;
}

async function loadProfileData() {
  const token = localStorage.getItem("authToken");
  console.log("Loading profile with token:", token);
  const response = await fetch(`${API_URL}/api/profile/`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const profile = await response.json();
    console.log("User profile:", profile);

    const fields = [
      "firstname",
      "lastname",
      "email",
      "phone",
      "maritalstatus",
      "gender",
      "address",
      "city",
      "country",
      "birthday",
      "job",
    ];

    fields.forEach((field) => {
      if ($$(field)) {
        $$(field).define("placeholder", profile[field]);
        $$(field).refresh();
        $$(field).setValue(profile[field]);
        $$(field).define("readonly", true);
      }
    });
  } else {
    console.error("Failed to load profile");
  }
}
