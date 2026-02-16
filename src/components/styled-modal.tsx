import * as React from "react"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out;
`

const ModalContainer = styled.div<{ $size?: "sm" | "md" | "lg" }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${slideUp} 0.3s ease-out;
  max-width: ${(props) =>
    props.$size === "sm" ? "400px" : props.$size === "lg" ? "800px" : "600px"};
  width: 90%;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  border-radius: 4px;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`

const ModalBody = styled.div`
  color: #4a4a4a;
  line-height: 1.6;
`

interface StyledModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function StyledModal({ isOpen, onClose, title, size = "md", children }: StyledModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <ModalContainer $size={size} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal">
            ×
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Overlay>
  )
}
