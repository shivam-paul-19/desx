import { useRef } from 'react'
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import IconButton from '@mui/material/IconButton';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import './toolbar.css';

function ToolBar({addRect, addCircle, addText, addLine, addPen, handleImageUpload, addTriangle, clear, download}) {
    const fileInputRef = useRef(null);
    return (
        <div className='toolbar'>
          <Tooltip TransitionComponent={Zoom} title="Rectangle tool">
            <IconButton onClick={addRect}>
              <RectangleOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Circle tool">
            <IconButton onClick={addCircle}>
              <CircleOutlinedIcon style={{ color: '#ffffff' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Triangle tool">
            <IconButton onClick={addTriangle}>
              <ChangeHistoryIcon style={{ color: '#ffffff' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Line tool">
            <IconButton onClick={addLine}>
              <TimelineOutlinedIcon style={{ color: '#ffffff' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Text tool">
            <IconButton onClick={addText}>
              <TextFieldsOutlinedIcon style={{ color: '#ffffff' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Image tool">
            <IconButton >
              <label htmlFor="file-input" style={{display: 'flex'}}>
                <ImageOutlinedIcon style={{ color: '#ffffff' }}/>
              </label>
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Clear canvas">
            <IconButton onClick={clear}>
              <ClearOutlinedIcon style={{ color: '#ffffff' }}/>
            </IconButton>
          </Tooltip>
            <input
                id='file-input'
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
          {/* <IconButton onClick={addPen}>
            <CreateOutlinedIcon style={{ color: '#ffffff' }}/>
            </IconButton> */}
          <Tooltip TransitionComponent={Zoom} title="Download as PNG">
            <IconButton onClick={download}>
              <FileDownloadOutlinedIcon style={{ color: '#ffffff' }}/>
            </IconButton>
          </Tooltip>
        </div>
    )
}

export default ToolBar;