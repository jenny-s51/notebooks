import * as React from 'react';
import { Content, Divider, Split, SplitItem } from '@patternfly/react-core';
import { useMemo, useState } from 'react';
import { WorkspaceImage } from '~/shared/types';
import { WorkspaceCreationImageDetails } from '~/app/pages/Workspaces/Creation/image/WorkspaceCreationImageDetails';
import { WorkspaceCreationImageList } from '~/app/pages/Workspaces/Creation/image/WorkspaceCreationImageList';
import { FilterByLabels } from '~/app/pages/Workspaces/Creation/labelFilter/FilterByLabels';

interface WorkspaceCreationImageSelectionProps {
  images: WorkspaceImage[];
  selectedImage: WorkspaceImage | undefined;
  onSelect: (image: WorkspaceImage | undefined) => void;
}

const WorkspaceCreationImageSelection: React.FunctionComponent<
  WorkspaceCreationImageSelectionProps
> = ({ images, selectedImage, onSelect }) => {
  const [selectedLabels, setSelectedLabels] = useState<Map<string, Set<string>>>(new Map());

  const imageFilterContent = useMemo(
    () => (
      <FilterByLabels
        labelledObjects={images.map((image) => image.labels)}
        selectedLabels={selectedLabels}
        onSelect={setSelectedLabels}
      />
    ),
    [images, selectedLabels, setSelectedLabels],
  );

  const imageDetailsContent = useMemo(
    () => <WorkspaceCreationImageDetails workspaceImage={selectedImage} />,
    [selectedImage],
  );

  return (
    <Content style={{ height: '100%' }}>
      <p>Select a workspace image and image version to use for the workspace.</p>
      <Divider />
      <Split hasGutter>
        <SplitItem style={{ minWidth: '200px' }}>{imageFilterContent}</SplitItem>
        <SplitItem isFilled>
          <WorkspaceCreationImageList
            images={images}
            selectedLabels={selectedLabels}
            selectedImage={selectedImage}
            onSelect={onSelect}
          />
        </SplitItem>
        <SplitItem style={{ minWidth: '200px' }}>{imageDetailsContent}</SplitItem>
      </Split>
    </Content>
  );
};

export { WorkspaceCreationImageSelection };
