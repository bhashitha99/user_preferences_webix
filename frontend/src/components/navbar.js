import "../styles/navbar.css";

// var menu_data_list= [
//     { id:"dashboard", value:"Dashboard", icon:"mdi-view-dashboard", css:"menu_data" },
//     { id:"reports", value:"Reports", icon:"mdi-clipboard-text",  css:"menu_data" },
//     { id:"notifications", value:"Notifications", icon:"mdi mdi-bell",  css:"menu_data"  },
//     { id:"settings", value:"Settings", icon:"mdi mdi-settings",  css:"menu_data"  },

// ]

webix.ui({
    rows: [
        {view:"toolbar", padding:3, css:"main_toolbar", elements:[
            {view:"icon", type:"icon", icon:"mdi mdi-menu", width:50, align:"left", css:"toobal_icon",
                click: function(){$$("$sidebar1").toggle();}
            },
            {view:"label", label:"My App"},
            {},
            {view:"icon", icon:"mdi mdi-comment", badge:4, css:"toobal_icon"},
            {view:"icon", icon:"mdi mdi-bell", badge:10, css:"toobal_icon"},
        ]},
        // {cols:[
        //     {view:"sidebar", width:300, data:menu_data_list, }
        // ]}
    ]
})
