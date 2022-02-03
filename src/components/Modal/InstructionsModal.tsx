import { FC } from "react";
import styled from "@emotion/styled";
import { Modal } from "./Modal";
import { SuccessReveal } from "../../constants/animations";

const BaseDelay = 500;

export const InstructionsModal: FC = () => {
  return (
    <Modal>
      <Title>How to play</Title>
      <Paragraph>Build a crossword by connecting the letters on the board.</Paragraph>
      <Paragraph>
        Each word must be a real english word. Every word must be connected to another word —
        like a crossword.
      </Paragraph>
      <Paragraph>
        Try to use as many letters as you can! There will always be at least one way to use
        every letter, so give it your best shot!
      </Paragraph>

      <Divider />

      <Example>
        <ExampleSection>
          <MiniBoardTyping />
        </ExampleSection>
        <ExampleSection>Create words that are connected together.</ExampleSection>
      </Example>

      <Example>
        <ExampleSection>
          <MiniBoardTyping />
        </ExampleSection>
        <ExampleSection>Create words that are connected together.</ExampleSection>
      </Example>
    </Modal>
  );
};

function MiniBoardTyping() {
  return (
    <MiniBoard>
      <MiniRow>
        <MiniTileWrapper>
          <MiniTileContentsSuccess animationDelay={0}>C</MiniTileContentsSuccess>
        </MiniTileWrapper>
        <MiniTileWrapper>
          <MiniTileContents></MiniTileContents>
        </MiniTileWrapper>
        <MiniTileWrapper>
          <MiniTileContents></MiniTileContents>
        </MiniTileWrapper>
      </MiniRow>
      <MiniRow>
        <MiniTileWrapper>
          <MiniTileContentsSuccess animationDelay={100}>A</MiniTileContentsSuccess>
        </MiniTileWrapper>
        <MiniTileWrapper>
          <MiniTileContentsSuccess animationDelay={200}>C</MiniTileContentsSuccess>
        </MiniTileWrapper>
        <MiniTileWrapper>
          <MiniTileContentsSuccess animationDelay={300}>T</MiniTileContentsSuccess>
        </MiniTileWrapper>
      </MiniRow>
      <MiniRow>
        <MiniTileWrapper>
          <MiniTileContentsSuccess animationDelay={200}>T</MiniTileContentsSuccess>
        </MiniTileWrapper>
        <MiniTileWrapper>
          <MiniTileContents></MiniTileContents>
        </MiniTileWrapper>
        <MiniTileWrapper>
          <MiniTileContents></MiniTileContents>
        </MiniTileWrapper>
      </MiniRow>
    </MiniBoard>
  );
}

const MiniBoard = styled.div`
  position: relative;
  background: #ffffff;
  width: 105px; // 3 tiles * tile size
  height: 105px;
`;

const MiniRow = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MiniTileWrapper = styled.div`
  position: relative;
  min-height: 33px;
  min-width: 33px;
  max-height: 33px;
  max-width: 33px;
  height: 100%;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MiniTileContents = styled.div`
  background: #ffffff;
  border: 2px solid #d3d6da;
  transition: border 50ms ease-in, background 50ms ease-in;
  color: #1a1a1b;
  min-height: 25px;
  min-width: 25px;
  max-height: 25px;
  max-width: 25px;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  opacity: 1;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const MiniTileContentsSuccess = styled.div<{ animationDelay: number }>`
  background: #ffffff;
  border: 2px solid #d3d6da;
  transition: border 50ms ease-in, background 50ms ease-in;
  color: #1a1a1b;
  min-height: 25px;
  min-width: 25px;
  max-height: 25px;
  max-width: 25px;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  opacity: 1;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  animation: ${SuccessReveal} 500ms ease-in;
  animation-delay: ${(p) => BaseDelay + p.animationDelay}ms;
  animation-fill-mode: forwards;
`;

// ====================================================

const Title = styled.h1`
  margin: 0 0 24px;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  text-align: center;
`;

const Paragraph = styled.p`
  margin: 0;
  margin-bottom: 18px;
  font-weight: 500;
  font-size: 1rem;
  text-align: left;
`;

const Divider = styled.div`
  border-bottom: 1px solid #d3d6da;
  width: 100%;
  margin: 12px auto 18px;
`;

const Example = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 12px;
`;

const ExampleSection = styled.div`
  width: 50%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
