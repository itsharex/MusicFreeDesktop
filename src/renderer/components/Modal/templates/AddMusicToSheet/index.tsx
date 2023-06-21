import MusicSheet from "@/renderer/core/music-sheet";
import Base from "../Base";
import "./index.scss";
import { setFallbackAlbum } from "@/renderer/utils/img-on-error";
import albumImg from "@/assets/imgs/album-cover.jpg";
import { hideModal } from "../..";

interface IAddMusicToSheetProps {
  musicItems: IMusic.IMusicItem | IMusic.IMusicItem[];
}

export default function AddMusicToSheet(props: IAddMusicToSheetProps) {
  const { musicItems } = props;

  const allSheets = MusicSheet.useAllSheets();
  return (
    <Base withBlur={false}>
      <div className="modal--add-music-to-sheet-container">
        <Base.Header>添加到歌单</Base.Header>
        <div className="music-sheets">
          {allSheets.map((sheet) => (
            <div
              className="sheet-item"
              key={sheet.id}
              role="button"
              onClick={() => {
                MusicSheet.addMusicToSheet(musicItems, sheet.id);
                hideModal();
              }}
            >
              <img
                src={sheet.artwork ?? albumImg}
                onError={setFallbackAlbum}
              ></img>
              <span>{sheet.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}