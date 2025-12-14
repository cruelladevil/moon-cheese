import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useMe } from '@/remote/getMe';
import { useGradePointList } from '@/remote/getGradePointList';

function CurrentLevelSection() {
  const {
    data: { grade, point },
  } = useMe();
  const {
    data: { gradePointList },
  } = useGradePointList();

  const currentGradeIndex = gradePointList.findIndex(({ type }) => type === grade);
  const currentGrade = gradePointList[currentGradeIndex];
  const nextGradeIndex = currentGradeIndex + 1;
  const nextGrade = gradePointList[nextGradeIndex];

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{grade}</Text>

          <ProgressBar
            value={(point - currentGrade.minPoint) / (nextGrade.minPoint - currentGrade.minPoint)}
            size="xs"
          />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {point}p
              </Text>
            </Box>
            <Box textAlign="right">
              {nextGrade == null ? null : (
                <>
                  <Text variant="C1_Bold">다음 등급까지</Text>
                  <Text variant="C2_Regular" color="neutral.03_gray">
                    {nextGrade.minPoint - point}p
                  </Text>
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;
