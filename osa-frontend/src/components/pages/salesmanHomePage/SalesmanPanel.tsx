import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
import AddProductTabPanel from "./AddProductTabPanel";
import UpdateProductTabPanel from "./UpdateProductTabPanel";
import ViewOrdersTabPanel from "./ViewOrdersTabPanel";

const SalesmanPanel = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: number) => setTabIndex(index);
    return (
        <Tabs width="full" isFitted variant="enclosed" isLazy index={tabIndex} onChange={handleTabsChange}>
            <TabList>
                <Tab>View/edit/delete products</Tab>
                <Tab>Add product</Tab>
                <Tab>View orders</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <UpdateProductTabPanel />
                </TabPanel>
                <TabPanel>
                    <AddProductTabPanel tabsHandle={handleTabsChange} />
                </TabPanel>
                <TabPanel>
                    <ViewOrdersTabPanel />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default SalesmanPanel;
