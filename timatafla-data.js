/* ==========================================
   BOX800 - GÖGN FYRIR TÍMATÖFLU

   Hér breytir þú tímatöflunni. Ekki þarf að
   snerta HTML eða CSS.

   - gildir:   textinn sem birtist efst
   - flokkar:  litur og hlekkur fyrir hvern tíma
   - timar:    allir tímar vikunnar

   Dagar: man, thr, mid, fim, fos, lau, sun
   Ef "lok" vantar birtist bara upphafstíminn.
========================================== */

window.box800Timatafla = {

  gildir: {
    is: "Gildir 31. ágúst – 28. nóvember",
    en: "Valid 31 August – 28 November"
  },

  /* tegund: "opinn" = opnir tímar (innifalið í korti)
             "namskeid" = námskeið (keypt sér)
     litur:  liturinn á spjaldinu í töflunni
     hlekkur: hvert er farið þegar smellt er (má sleppa)
     en:     heiti á ensku (má sleppa) */

  flokkar: {
    "Hreysti":         { tegund: "opinn" },
    "Hyrox":           { tegund: "opinn" },
    "Barre":           { tegund: "opinn" },
    "Parahreysti":     { tegund: "namskeid", litur: "#f2a65a" },
    "Mömmuhreysti":    { tegund: "namskeid", en: "Mothers’ Fitness", litur: "#e07470", hlekkur: "namskeid.html#mommuhreysti" },
    "Mömmugrunnur":    { tegund: "namskeid", en: "Postnatal Foundations", litur: "#ff99d6", hlekkur: "namskeid.html#mommugrunnur" },
    "Heldrihreysti":   { tegund: "namskeid", en: "Senior Fitness", litur: "#f5d33f", hlekkur: "namskeid.html#heldrihreysti" },
    "Unglingastyrkur": { tegund: "namskeid", en: "Youth Strength", litur: "#7fae8a", hlekkur: "namskeid.html#unglingastyrkur" },
    "Konuhreysti":     { tegund: "namskeid", en: "Women’s Fitness", litur: "#c372ea", hlekkur: "namskeid.html#konuhreysti" },
    "Þolþjálfun":      { tegund: "namskeid", en: "Endurance Training", litur: "#5ce0e6", hlekkur: "namskeid.html#tholthjalfun" },
    "Karlahreysti":    { tegund: "namskeid", en: "Men’s Fitness", litur: "#5b93ea", hlekkur: "namskeid.html#karlahreysti" }
  },

  timar: [

    /* MÁNUDAGUR */
    { dagur: "man", byrjun: "06:00", lok: "06:50", heiti: "Hyrox" },
    { dagur: "man", byrjun: "08:30", lok: "09:30", heiti: "Hyrox" },
    { dagur: "man", byrjun: "09:30", lok: "10:20", heiti: "Mömmuhreysti" },
    { dagur: "man", byrjun: "10:30", lok: "11:30", heiti: "Mömmuhreysti" },
    { dagur: "man", byrjun: "12:00", lok: "12:50", heiti: "Hyrox" },
    { dagur: "man", byrjun: "14:50", lok: "15:40", heiti: "Unglingastyrkur" },
    { dagur: "man", byrjun: "16:30", lok: "17:30", heiti: "Hyrox" },
    { dagur: "man", byrjun: "17:35", lok: "18:35", heiti: "Hyrox" },
    { dagur: "man", byrjun: "19:45", lok: "20:35", heiti: "Karlahreysti" },

    /* ÞRIÐJUDAGUR */
    { dagur: "thr", byrjun: "06:00", lok: "06:50", heiti: "Hreysti" },
    { dagur: "thr", byrjun: "08:30", lok: "09:30", heiti: "Hreysti" },
    { dagur: "thr", byrjun: "09:30", lok: "10:20", heiti: "Heldrihreysti" },
    { dagur: "thr", byrjun: "10:30", lok: "11:30", heiti: "Mömmugrunnur" },
    { dagur: "thr", byrjun: "12:00", lok: "12:50", heiti: "Hreysti" },
    { dagur: "thr", byrjun: "16:30", lok: "17:30", heiti: "Konuhreysti" },
    { dagur: "thr", byrjun: "16:30", lok: "17:30", heiti: "Hreysti" },
    { dagur: "thr", byrjun: "17:35", lok: "18:35", heiti: "Þolþjálfun" },
    { dagur: "thr", byrjun: "17:35", lok: "18:35", heiti: "Hreysti" },
    { dagur: "thr", byrjun: "19:45", lok: "20:35", heiti: "Barre" },

    /* MIÐVIKUDAGUR */
    { dagur: "mid", byrjun: "06:00", lok: "06:50", heiti: "Hreysti" },
    { dagur: "mid", byrjun: "08:30", lok: "09:30", heiti: "Hreysti" },
    { dagur: "mid", byrjun: "09:30", lok: "10:20", heiti: "Mömmuhreysti" },
    { dagur: "mid", byrjun: "10:30", lok: "11:30", heiti: "Mömmuhreysti" },
    { dagur: "mid", byrjun: "12:00", lok: "12:50", heiti: "Hreysti" },
    { dagur: "mid", byrjun: "14:50", lok: "15:40", heiti: "Unglingastyrkur" },
    { dagur: "mid", byrjun: "16:30", lok: "17:30", heiti: "Hreysti" },
    { dagur: "mid", byrjun: "17:35", lok: "18:35", heiti: "Hreysti" },
    { dagur: "mid", byrjun: "19:45", lok: "20:35", heiti: "Karlahreysti" },

    /* FIMMTUDAGUR */
    { dagur: "fim", byrjun: "06:00", lok: "06:50", heiti: "Hreysti" },
    { dagur: "fim", byrjun: "08:30", lok: "09:30", heiti: "Hreysti" },
    { dagur: "fim", byrjun: "09:30", lok: "10:20", heiti: "Heldrihreysti" },
    { dagur: "fim", byrjun: "10:30", lok: "11:30", heiti: "Mömmugrunnur" },
    { dagur: "fim", byrjun: "12:00", lok: "12:50", heiti: "Hreysti" },
    { dagur: "fim", byrjun: "16:30", lok: "17:30", heiti: "Konuhreysti" },
    { dagur: "fim", byrjun: "16:30", lok: "17:30", heiti: "Hreysti" },
    { dagur: "fim", byrjun: "17:35", lok: "18:35", heiti: "Þolþjálfun" },
    { dagur: "fim", byrjun: "17:35", lok: "18:35", heiti: "Hreysti" },
    { dagur: "fim", byrjun: "17:35", heiti: "Barre" },

    /* FÖSTUDAGUR */
    { dagur: "fos", byrjun: "06:00", lok: "06:50", heiti: "Hreysti" },
    { dagur: "fos", byrjun: "08:30", lok: "09:30", heiti: "Hreysti" },
    { dagur: "fos", byrjun: "09:30", lok: "10:20", heiti: "Mömmuhreysti" },
    { dagur: "fos", byrjun: "10:30", lok: "11:30", heiti: "Mömmuhreysti" },
    { dagur: "fos", byrjun: "12:00", lok: "12:50", heiti: "Hreysti" },
    { dagur: "fos", byrjun: "16:30", lok: "17:30", heiti: "Hreysti" },

    /* LAUGARDAGUR */
    { dagur: "lau", byrjun: "08:30", heiti: "Parahreysti" },
    { dagur: "lau", byrjun: "09:35", heiti: "Parahreysti" },

    /* SUNNUDAGUR */
    { dagur: "sun", byrjun: "10:00", heiti: "Hreysti" }

  ]

};
