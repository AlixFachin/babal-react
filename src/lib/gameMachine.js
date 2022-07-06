import { createMachine } from "xstate";

export const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5RQIYFswFkUGMAWAlgHZgB0AEgPYYDEselA7gMIBOkBALvEiAA6VYXApSKJQAD0QBaAOwAmUgBYAzAFYAjCqWyNANnk6NagDQgAnjKUbZpDUqXyAHE902lATlkBfb2dQY2PjEZFS0sJworJwA4uhg4vyCwqKJUgjSWmqkAAweSk5qBh4qKrI5OmaWGfJlpHpe2mrWerIeak6+-vFBhCQU1GB0DIwAymCcnMRQPKACQlOpvOnSnqTqDWoKGjY28rJVMs56ymr5Kjk58vIeDSpdIAFYuH1kTwAK7KOR0TR87BEopwACoEDCsRLzFJiZaIJQnBRnNQ5VxqQyyZF6Q4ZZrrFTXWQqc7yM7OB5PXohUg4dgQLiwUY0sBgIg0ABGuAA1mEErwoYsYZIjqpSM4NPIDK0rvoCtjpGiPHYLko1ETZLInHpmuSei8qU8ADIEABuQwANoJOEaAGa8ubJAVpRCtUganJ6PSOFQaJzqVTYjyKT0VUo6NRFQn3PyPXXBfpmgi2g2WgAiBFgfDNKHMNBwoimRAArmA4hhIQ6RIKQCtjDl1h4bCjleoNU5sTpSO1xY4fSTHDko91Anr44mwMmImmM1mc08APKmiF8itLIUID2kJwVFE6eR5a7qbHo3L7GwKLV6b2OHXDuNkUtgBdgVhTzPZmjsTiF1hEHnlhaVk6NSyEo9QeiiHj5PIGhXNiGiQZ2OitOUejwc0Sg3s8d6kLAEwFjMjLsCy7Jcn+y4Aau1aIOKioeDkZy3DsNweIUBwWDIRJ1hKIGofBhhFFG0ZEJQEBwIkFIjqEgz-tCQHSIYJxOEhl5lCSl5bHKRIIq08KXKUXY+NGEnYR8Xw-JwMmOrCNSKue+yBjotw3KY7EZDRopeGcMFatBEqYZS-RMnS3CEcyVb8oB1niiouRtKo3ESqU+JysioHuko6XIpcp4YUZsavKQhomnaSQUVWNZOHY+gbEUumqGiR7ZN64atF4vqomo-mSaQCZJqm6ZvtU9plXJ4q5MYSUDr6GIqvIcFKaKeRoqU7oNt6g4xreBUPk+L4DTOlmRWu8mga26oegYyr6Firmhp26qqNoSklLoXXYbhkzTAyTIsodlHpO0nZaG0ZytpBxhytBMUVCxHTwRUejum9rx-eVRwsWBiNOJBPawa50iI4oWgVFs1yqgYnS+N4QA */
createMachine({
  initial: "Home",
  states: {
    Home: {
      on: {
        showCredits: {
          target: "creditsScreen",
        },
        startGame: {
          target: "gamePreStart",
        },
        showSettings: {
          target: "settingsScreen",
        },
      },
    },
    gamePreStart: {
      on: {
        prestartTimer: {
          target: "gameLive",
        },
      },
    },
    creditsScreen: {
      on: {
        backHome: {
          target: "Home",
        },
      },
    },
    gameLive: {
      on: {
        lostLife: {
          target: "lifeLostDisplay",
        },
      },
    },
    lifeLostDisplay: {
      on: {
        continueGame: {
          target: "gamePreStart",
        },
        gameOver: {
          target: "GameOverDisplay",
        },
      },
    },
    GameOverDisplay: {
      on: {
        backHome: {
          target: "Home",
        },
      },
    },
    settingsScreen: {
      on: {
        backHome: {
          target: "Home",
        },
      },
    },
  },
  id: "gameMachine",
});