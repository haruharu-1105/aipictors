import { ImageGenerationAction } from "@/app/[lang]/(beta)/generation/_machines/models/image-generation-action"
import { ImageGenerationConfig } from "@/app/_models/image-generation-config"

const config = new ImageGenerationConfig({
  passType: null,
  modelId: "",
  modelIds: [],
  promptText: "",
  negativePromptText: "",
  sampler: "",
  scale: 0,
  seed: -1,
  sizeType: "SD1_256_256",
  modelType: "SD1",
  steps: 0,
  vae: "",
})

describe("ImageGenerationAction", () => {
  describe("updatePrompt", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the prompt text and return a new ImageGenerationConfig instance", () => {
      const text = "New prompt text"
      const updatedConfig = imageGenerationAction.updatePrompt(text)
      expect(updatedConfig.promptText).toBe(text)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateNegativePrompt", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the negative prompt text and return a new ImageGenerationConfig instance", () => {
      const text = "New negative prompt text"
      const updatedConfig = imageGenerationAction.updateNegativePrompt(text)
      expect(updatedConfig.negativePromptText).toBe(text)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateSampler", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the sampler text and return a new ImageGenerationConfig instance", () => {
      const text = "New sampler text"
      const updatedConfig = imageGenerationAction.updateSampler(text)
      expect(updatedConfig.sampler).toBe(text)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateSteps", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the steps value and return a new ImageGenerationConfig instance", () => {
      const value = 10
      const updatedConfig = imageGenerationAction.updateSteps(value)
      expect(updatedConfig.steps).toBe(value)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateScale", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the scale value and return a new ImageGenerationConfig instance", () => {
      const value = 1
      const updatedConfig = imageGenerationAction.updateScale(value)
      expect(updatedConfig.scale).toBe(value)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateSizeType", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the size type and return a new ImageGenerationConfig instance", () => {
      const text = "New size type"
      const updatedConfig = imageGenerationAction.updateSizeType(text)
      expect(updatedConfig.sizeType).toBe(text)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateVae", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the vae text and return a new ImageGenerationConfig instance", () => {
      const text = "New vae text"
      const updatedConfig = imageGenerationAction.updateVae(text)
      expect(updatedConfig.vae).toBe(text)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateSeed", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the seed value and return a new ImageGenerationConfig instance", () => {
      const value = 10
      const updatedConfig = imageGenerationAction.updateSeed(value)
      expect(updatedConfig.seed).toBe(value)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("updateModelId", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should update the model id and return a new ImageGenerationConfig instance", () => {
      const id = "1"
      const updatedConfig = imageGenerationAction.updateModelId(id, "SD1")
      expect(updatedConfig.modelId).toBe(id)
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })

    test("should update the size type to SD2_768_768 when the model id is 22, 23, or 24 and the current size type includes SD1", () => {
      const id = "22"
      const updatedConfig = imageGenerationAction.updateModelId(id, "SD2")
      expect(updatedConfig.sizeType).toBe("SD2_768_768")
      expect(updatedConfig).toBeInstanceOf(ImageGenerationConfig)
    })
  })

  describe("getModelSizeType", () => {
    const imageGenerationAction = new ImageGenerationAction(config)

    test("should return the correct size type for SD1 model type", () => {
      const sizeType = "SD2_768_768"
      const modelType = "SD1"
      const result = imageGenerationAction.getModelSizeType(sizeType, modelType)
      expect(result).toBe("SD1_512_512")
    })

    test("should return the correct size type for SD2 model type", () => {
      const sizeType = "SD1_512_512"
      const modelType = "SD2"
      const result = imageGenerationAction.getModelSizeType(sizeType, modelType)
      expect(result).toBe("SD2_768_768")
    })

    test("should return the correct size type for SDXL model type", () => {
      const sizeType = "SD2_768_768"
      const modelType = "SDXL"
      const result = imageGenerationAction.getModelSizeType(sizeType, modelType)
      expect(result).toBe("SD3_1024_1024")
    })

    test("should return the default size type for unknown model types", () => {
      const sizeType = "SD1_512_512"
      const modelType = "Unknown"
      const result = imageGenerationAction.getModelSizeType(sizeType, modelType)
      expect(result).toBe("SD3_1024_1024")
    })
  })
})

describe("getNegativePromptTextFromSd", () => {
  const imageGenerationAction = new ImageGenerationAction(config)

  test("should return 'EasyNegative' when negativePromptText is empty and sdType is 'SD1'", () => {
    const sdType = "SD1"
    const negativePromptText = ""
    const result = imageGenerationAction.getNegativePromptText(
      sdType,
      negativePromptText,
    )
    expect(result).toBe("EasyNegative")
  })

  test("should return 'Mayng' when negativePromptText is empty and sdType is 'SD2'", () => {
    const sdType = "SD2"
    const negativePromptText = ""
    const result = imageGenerationAction.getNegativePromptText(
      sdType,
      negativePromptText,
    )
    expect(result).toBe("Mayng")
  })

  test("should return 'negativeXL_D' when negativePromptText is empty and sdType is 'SDXL'", () => {
    const sdType = "SDXL"
    const negativePromptText = ""
    const result = imageGenerationAction.getNegativePromptText(
      sdType,
      negativePromptText,
    )
    expect(result).toBe("negativeXL_D")
  })

  test("should return 'EasyNegative' when negativePromptText is 'EasyNegative' and sdType is 'SD1'", () => {
    const sdType = "SD1"
    const negativePromptText = "EasyNegative"
    const result = imageGenerationAction.getNegativePromptText(
      sdType,
      negativePromptText,
    )
    expect(result).toBe("EasyNegative")
  })
})