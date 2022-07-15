import { createMachine } from "xstate";

export const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5RQIYFswFkUGMAWAlgHZgB0AEgPYYDEselA7gMIBOkBALvEiAA6VYXApSKJQAD0QBaAOwAmUgBYAzAFYAjCqWyNANnk6NagDQgAnjKUbZpDUqXyAHE902lATlkBfb2dQY2PjEZFS0sJworJwA4uhg4vyCwqKJUgjSWmqkAAweSk5qBh4qKrI5OmaWGfJlpHpe2mrWerIeak6+-vFBhCQU1GB0DIwAymCcnMRQPKACQlOpvOnSnqTqDWoKGjY28rJVMs56ymr5Kjk58vIeDSpdIAFYuH1kTwAK7KOR0TR87BEopwACoEDCsRLzFJiZaIJQnBRnNQ5VxqQyyZF6Q4ZZrrFTXWQqc7yM7OB5PXohUg4dgQLiwUY0sBgIg0ABGuAA1mEErwoYsYZIjqpSM4NPIDK0rvoCtjpGiPHYLko1ETZLInHpmuSei8qU8ADIEABuQwANoJOEaAGa8ubJAVpRCtUganJ6PSOFQaJzqVTYjyKT0VUo6NRFQn3PyPXXBfqGk1DDk4bmDSEOkSCkArC62cNnFFElw7DTY2oaUiadrwq4ecVEpQ6wJ6-pmgi2g2WgAiBFgfDNKHMNBwoimRAArmA4hh0wtM06MsYcus6+VfSGti5sTpSO1xY4fSTHDko91m3GyG2O93e-3BzQngB5U0QvkZpZChAe0hOCoonTyHk1zqGWO5XLo6oSkU3qOE2zwXqQ05gM+YCsD2fYDkOyapjOb5zh+2aIIB2T6KUGg5LISiXESHRyiqihaFRHrkdccGUv0sATGOMyMuwLLslyPKztCC7ioqHg5Gctw7DcHiFAcFgyESy4SpReg7IGKp6FG0ZEJQEBwIkFItqEaZ4SJsI1PCP46B6pSItpWxykSCKtDWJ40TYbEmaQHxfD8nDCY6lnSDcroSvsmltMUpiKYuYU3Bidbumi4p6N5CFMnS3C8cyWb8vOln1rkbSqKpEqlPicrIkouTBp6yKXPs9gZa8vnxEappBYVn6ZE4dikUURQ1qoaJltk3rhq0Xi+qiaitVSV5gJ2EToXe1T2vhWYrOKuTGJVJ6+hi9HYj6tWAe0tQXA0WhaAt-RIShaG3ph3UESshiui46oegYyr6FicWhru6qqNoTieGUGj3WQnGTNMDJMiyb3bYg7S7lobRnBqTgeHWsXVKFWi5J4hROBoEk1ul0bGReKMLtIZGVuGEm+nJ5M7HKehXEqFTNJo+LqfNvjeEAA */
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
        backHome: {
          target: "Home",
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