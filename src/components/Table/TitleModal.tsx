import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useTitleStore from "@/store/useTitleStore";
import { ModalBox, Button } from "@/components/common/UI";
import { Title } from "@/types/bill";

const TitleModal = () => {
  const titles = useTitleStore((state) => state.titles);
  const removeTitles = useTitleStore((state) => state.removeTitles);

  const [openTab, setOpenTab] = useState("en");

  const languages = [
    { short: "en", label: "English" },
    { short: "ga", label: "Gaeilge" },
  ];

  return (
    <Modal
      open={!!Object.values(titles).some((oneTitle) => !!oneTitle)}
      onClose={removeTitles}
    >
      <ModalBox>
        <Tabs
          sx={{ marginBottom: 1 }}
          value={openTab}
          onChange={(e: React.SyntheticEvent, selectedTab: string) => {
            setOpenTab(selectedTab);
          }}
        >
          {languages.map(({ label, short }) => (
            <Tab label={label} value={short} key={short} />
          ))}
        </Tabs>
        <Typography sx={{ padding: 2, maxHeight: "50vh", overflowY: "auto" }}>
          {titles[openTab as keyof Title]}
        </Typography>
        <Button onClick={removeTitles} sx={{ float: "right", marginTop: 4 }}>
          Ok
        </Button>
      </ModalBox>
    </Modal>
  );
};

export default TitleModal;
