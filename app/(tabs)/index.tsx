import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import { LegendList } from "@legendapp/list";
import { P2Regular } from "@/components/typography";
import { getFormattedDateWithTodayTomorrow } from "@/components/locale-fns";
import { TimelineItem } from "@/constants/entities";
import { TimelineEvent } from "@/components/TimelineEvent";
import { sampleData } from "@/constants/data";
import { SafeAreaView } from "react-native-safe-area-context";

export type Separator = {
  type: "date_separator";
  id: string;
  attributes: {
    time: string;
  };
};

export type RenderItemType = {
  item: ExtendedTimelineEvent;
};

export const isSeparator = (item: ExtendedTimelineEvent): item is Separator => {
  return item.type === "date_separator";
};
export type ExtendedTimelineEvent = TimelineItem | Separator;

const insertSeparators = (events: ExtendedTimelineEvent[]) => {
  let prevTime = new Date(0);
  const stickyIndices: number[] = [];
  const separatorIndices: { [time: string]: number } = {};

  const data = events.reduce((acc, event) => {
    const time = event.attributes.time;
    const date = new Date(time);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() !== prevTime.getTime()) {
      acc.push({
        type: "date_separator",
        id: "separator" + time,
        attributes: { time },
      });
      stickyIndices.push(acc.length - 1);
      const index = time.split("T")[0];
      separatorIndices[index] = acc.length - 1;
    }
    prevTime = date;
    acc.push(event);
    return acc;
  }, [] as ExtendedTimelineEvent[]);
  return { data, stickyIndices, separatorIndices };
};

const RenderItem = ({ item }: RenderItemType) => {
  const testID = "timeline";
  // const navigation = useNavigation();
  if (isSeparator(item)) {
    return (
      <SectionHeaderWrapper>
        <P2Regular>
          {getFormattedDateWithTodayTomorrow(
            new Date(item.attributes.time),
            false
          )}
        </P2Regular>
      </SectionHeaderWrapper>
    );
  }
  const goToItemDetails = () => {};
  return (
    <TimelineEvent item={item} testID={testID} onPress={goToItemDetails} />
  );
};

const TimelineComponent: FC = () => {
  const testID = "timeline";

  const data = sampleData;

  const { data: items } = insertSeparators((data as TimelineItem[]) || []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainContainer testID={`${testID}-screen`}>
        {items?.length ? (
          <LegendList<TimelineItem>
            estimatedItemSize={84}
            keyExtractor={(item, index) => index}
            testID={`${testID}-events-list`}
            data={items}
            renderItem={RenderItem}
            recycleItems
            drawDistance={1000}
            showsVerticalScrollIndicator={true}
          />
        ) : null}
      </MainContainer>
    </SafeAreaView>
  );
};

export default TimelineComponent;

const SectionHeaderWrapper = styled.View`
  background-color: ${({ theme }) => theme.color.grey5};
  padding: 12px 16px;
`;

const MainContainer = styled(View)`
  flex: 1;
  background-color: white;
`;
