import * as S from './styles';
import { Dispatch, RefObject, SetStateAction, useCallback, useLayoutEffect, useRef } from "react";
import { VideoCanvas } from "../../../Molecules/Editor/VideoCanvas"
import { Layer, Source } from "../../../../types";
import useResizeObserver from '@react-hook/resize-observer';

export interface ContentProps {
  setLayers: Dispatch<SetStateAction<Array<Layer>>>,
  layers: Array<Layer>,
  hoverLayerId: number | null,
  setHoverLayerId: Dispatch<SetStateAction<number | null>>,
  selectedLayerId: number | null,
  setSelectedLayerId: Dispatch<SetStateAction<number | null>>,
  videoCanvasRef: RefObject<HTMLCanvasElement>,
}

export const Content = ({
  layers,
  setLayers,
  hoverLayerId,
  setHoverLayerId,
  selectedLayerId,
  setSelectedLayerId,
  videoCanvasRef,
}: ContentProps) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const potraitContainerRef = useRef<HTMLDivElement>(null);
  const landscapeContainerRef = useRef<HTMLDivElement>(null);

  const onInputChange = (id: number, src: Source) => {
    setLayers(prev => (
      prev.map(i => i.id !== id ? i : {
        ...i,
        input: src
      } satisfies Layer)
    ));
  };

  const onOutputChange = (id: number, output: Source) => {
    setLayers(prev => (
      prev.map(i => i.id !== id ? i : {
        ...i,
        output: output
      } satisfies Layer)
    ));
  }

  const inputLayers: Array<Layer> = layers.map((item) => ({
    ...item,
    input: undefined,
    output: item.input!,
  }));

  const outputLayers: Array<Layer> = layers.map((item) => ({
    ...item,
    output: item.output,
    input: item.input
  }));

  const handleResize = useCallback(() =>  {
    if (!containerRef.current || !potraitContainerRef.current || !landscapeContainerRef.current ) return;
    // assume potrait is always at 100%
    const { width, height } = containerRef.current.getBoundingClientRect();
    const c1Width = potraitContainerRef.current.getBoundingClientRect().width;
    const restingWidth = (width - c1Width);
    const heightWithAspect = Math.min(((restingWidth / 16) * 9), height);
    const widthWithAspect = (heightWithAspect / 9) * 16;

    if (heightWithAspect < height && widthWithAspect < width) {
      landscapeContainerRef.current.style.height = heightWithAspect.toString() + 'px';
      landscapeContainerRef.current.style.width = '';
      return;
    }

    const widthWithAspect2 = Math.min(widthWithAspect, width);
    landscapeContainerRef.current.style.height = '';
    landscapeContainerRef.current.style.width = widthWithAspect2.toString() + 'px';
  }, []);

  useLayoutEffect(handleResize, [handleResize]);
  useResizeObserver(containerRef, handleResize);

  return (
    <S.Container ref={containerRef}>

      <S.Landscape ref={landscapeContainerRef}>
        <VideoCanvas
          renderVideo
          hoverLayerId={hoverLayerId}
          selectedLayerId={selectedLayerId}
          setHoverLayerId={setHoverLayerId}
          setSelectedLayerId={setSelectedLayerId}
          direction='landscape'
          onOutputChange={onInputChange}
          layers={inputLayers}
          videoRef={videoCanvasRef}
          withPadding
        />
      </S.Landscape>

      <S.Potrait ref={potraitContainerRef}>
        <VideoCanvas
          hoverLayerId={hoverLayerId}
          selectedLayerId={selectedLayerId}
          setHoverLayerId={setHoverLayerId}
          setSelectedLayerId={setSelectedLayerId}
          direction='portrait'
          onOutputChange={onOutputChange}
          layers={outputLayers}
          videoRef={videoCanvasRef}
          withPadding
        />
      </S.Potrait>

    </S.Container>
  )

}