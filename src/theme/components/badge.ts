import { ComponentSingleStyleConfig } from "@chakra-ui/react"

const badge: ComponentSingleStyleConfig = {
  baseStyle: {
    borderRadius: 10,
    minHeight: 30,
    padding: "5px 16px",
    fontSize: "13px",
    textTransform: "initial",
  }, 
  variants: {
    feedbackTag: {
      color: "secondary.500",
      backgroundColor: "gray.100",
    }
  }
}

export default badge