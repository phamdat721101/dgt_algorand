export const steps: any = [
    // Example steps
    {
      icon: <>👋</>,
      title: "Welcome to Digitrust!",
      content: <>Welcome to Digitrust!Go to the first deposit here!</>,
      selector: "#onborda-step1",
      side: "top",
      showControls: false,
      pointerPadding: 5,
      pointerRadius: 10,
      nextRoute: "/detail",
    },
    {
      icon: <>🪄</>,
      title: "Start Invest!",
      content: (
        <>
          Click this button <b>framer-motion</b> to start invest and get more{" "}
          <b>profit</b> as you can.
        </>
      ),
      selector: "#onborda-step2",
      side: "top",
      showControls: true,
      pointerPadding: 5,
      pointerRadius: 10,
      prevRoute: "/home",
    },
    {
      icon: <>🎩</>,
      title: "Deposit!",
      content: (
        <>
          Click here <b>to Deposit</b> your asset and{" "}
          <b>get coin</b> to take profit.
        </>
      ),
      selector: "#onborda-step3",
      side: "top",
      showControls: true,
      pointerPadding: 5,
      pointerRadius: 10,
    },
    {
      icon: <>🌀</>,
      title: "Withdraw",
      content: <>Click here to go withdraw tab!</>,
      selector: "#onborda-step4",
      side: "top",
      showControls: true,
      pointerPadding: 50,
      pointerRadius: 10,
    },
    {
      icon: <>🌀</>,
      title: "Withdraw",
      content: <>Click here to withdraw assets!</>,
      selector: "#onborda-step5",
      side: "top",
      showControls: true,
      pointerPadding: 5,
      pointerRadius: 10,
    }
  ];
  