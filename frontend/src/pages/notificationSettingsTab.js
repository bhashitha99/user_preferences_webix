import "../styles/settings.css";
import {boxWithoutEditPermission} from "../components/formFields.js";
import { saveFormData, fetchData } from "../utils/api.js";
import { API_URL } from "../config/config.js";
import { responsiveLayout,getTabHeader } from "../utils/responsiveUtil.js";
import {notificationInitialValues} from "../config/initialValues.js";


export async function reloadNotificationSettings() {
  const API_URL = import.meta.env.VITE_API_URL;
  const notificationSettings = await fetchData(`${API_URL}/api/notification-settings/`);

  const notificationFields = [
    "meetingReminders", "timesheetReminders", "projectUpdates", "teamMentions", "reaveRequestStatus",
    "taskAssignments", "announcementUpdates", "emailAlerts", "smsAlerts", "pushNotifications",
    "browserNotifications", "desktopNotifications", "notificationSound", "notificationVolume",
    "enableSoundAlerts", "dndMode"
  ];

  notificationFields.forEach((field) => {
    if ($$(field)) {
      const view = $$(field).config.view;
      $$(field).setValue(notificationSettings[field]);

      // Only set readonly for supported views
      if (!["switch", "slider", "checkbox"].includes(view)) {
        $$(field).define("readonly", true);
      }
      $$(field).refresh();
    }
  });
}


export function getNotificationSettingsTab() {

  const tab= {
    header: getTabHeader("fas fa-solid fa-bell", "Notification Settings"),
    body: {
      rows: [
        {
          view: "form",
          scroll: "y",
          id: "notificationForm",
          elements: [
            {
              rows: [
                {
                  margin: 10,
                  view: "template",
                  template: "Notification Alert",
                  type: "section",
                  css: "section-header",
                },
                {
                  ...responsiveLayout([
                    {
                      rows: [
                        boxWithoutEditPermission(
                          "Meeting Reminders",
                          "meetingReminders",
                          "switch",
                          1,
                          200
                        ),
                        boxWithoutEditPermission(
                          "Timesheet Reminders",
                          "timesheetReminders",
                          "switch",
                          1,
                          200
                        ),
                        boxWithoutEditPermission(
                          "Project Updates",
                          "projectUpdates",
                          "switch",
                          1,
                          200
                        ),
                        boxWithoutEditPermission(
                          "Team Mentions",
                          "teamMentions",
                          "switch",
                          1,
                          200
                        ),
                      ],
                    },
                    {
                      rows: [
                        boxWithoutEditPermission(
                          "Leave Request Status",
                          "reaveRequestStatus",
                          "switch",
                          0,
                          200
                        ),
                        boxWithoutEditPermission(
                          "Task Assignments",
                          "taskAssignments",
                          "switch",
                          0,
                          200
                        ),
                        boxWithoutEditPermission(
                          "Announcement Updates",
                          "announcementUpdates",
                          "switch",
                          0,
                          200
                        ),
                      ],
                    },
                  ]),
                },
                {
                  margin: 10,
                  view: "template",
                  template: "Alert Methods",
                  type: "section",
                  css: "section-header",
                },
                {
                  ...responsiveLayout([
                    {
                      rows: [
                        boxWithoutEditPermission(
                          "Email Alerts",
                          "emailAlerts",
                          "switch",
                          1,
                          200
                        ),
                        boxWithoutEditPermission(
                          "SMS Alerts",
                          "smsAlerts",
                          "switch",
                          0,
                          200
                        ),
                        boxWithoutEditPermission(
                          "Push Notifications",
                          "pushNotifications",
                          "switch",
                          1,
                          200
                        ),
                      ],
                    },
                    {
                      rows: [
                        boxWithoutEditPermission(
                          "Browser Notifications",
                          "browserNotifications",
                          "switch",
                          1,
                          200
                        ),
                        boxWithoutEditPermission(
                          "Desktop Notifications",
                          "desktopNotifications",
                          "switch",
                          0,
                          200
                        ),
                      ],
                    },
                  ]),
                },
                {
                  margin: 10,
                  view: "template",
                  template: "Notification Sound",
                  type: "section",
                  css: "section-header",
                },
                {
                  rows: [
                    boxWithoutEditPermission(
                      "Notification Sound",
                      "notificationSound",
                      "combo",
                      [
                        { id: "default", value: "Default" },
                        { id: "chime", value: "Chime" },
                        { id: "ding", value: "Ding" },
                        { id: "alert", value: "Alert" },
                      ],
                      200,
                      300
                    ),
                    {
                      view: "slider",
                      label: "Volume",
                      name: "notificationVolume",
                      id: "notificationVolume",
                      min: 0,
                      max: 100,
                      value: 70, // default value
                      labelWidth: 200,
                      inputWidth: 500,
                    },
                    boxWithoutEditPermission(
                      "Enable Sound Alerts",
                      "enableSoundAlerts",
                      "switch",
                      1,
                      200
                    ),
                    {
                      rows: [
                        {
                          view: "switch",
                          label: "Do Not Disturb Mode",
                          name: "dndMode",
                          id: "dndMode",
                          value: 0,
                          labelWidth: 200,
                        },
                      ],
                    },
                  ],
                },
                { height: 100 },
              ],
            },

            {
              cols: [
                {
                  view: "button",
                  value: "Reset",
                  css: "webix_secondary reset-button",
                  click: function () {
                    webix.confirm({
                      title: "Confirm Reset",
                      text: "Are you sure you want to reset your notification settings?",
                      ok: "Yes, Reset",
                      cancel: "Cancel",
                      callback: function (result) {
                        if (result) {
                          saveFormData(
                            `${API_URL}/api/notification-settings/`,
                            notificationInitialValues
                          )
                            .then(() => {
                              webix.message(
                                "Settings have been reset and saved."
                              );
                              reloadNotificationSettings();
                            })
                            .catch((err) => {
                              webix.message({
                                type: "error",
                                text: "Failed to reset settings: " + err,
                              });
                            });
                        }
                      },
                    });
                  },
                },

                {
                  view: "button",
                  value: "Save Changes",
                  type: "form",
                  css: "webix_primary save-button",
                  click: function () {
                    webix.confirm({
                      title: "Confirm Save",
                      text: "Are you sure you want to save these notification settings?",
                      ok: "Yes, Save",
                      cancel: "Cancel",
                      callback: function (result) {
                        if (result) {
                          saveFormData(
                            `${API_URL}/api/notification-settings/`,
                            $$("notificationForm").getValues()
                          )
                            .then(() => {
                              webix.message(
                                "Notification settings saved successfully!"
                              );
                            })
                            .catch((err) => {
                              webix.message({
                                type: "error",
                                text: "Failed to save changes: " + err,
                              });
                            });
                        }
                      },
                    });
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };

 return tab;
}
