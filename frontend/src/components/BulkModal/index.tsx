import { Box, Dialog, Typography } from "@mui/material";
import { X } from "lucide-react";
import CustomButton from "../CustomButtom";
import basicStyles from "../BasicModal/modal.module.css";
import type { BulkModalProps } from "./type";

import styles from "./bulkModal.module.css";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function BulkModal<T extends unknown>({
  open,
  title,
  maxNumItems = 10,
  items = [],
  renderList,
  children,
  onCloseAction,
  onConfirmAction,
  listHeaderTitle,
  formHeaderTitle,
}: BulkModalProps<T>) {
  return (
    <Dialog
      open={open}
      onClose={onCloseAction}
      closeAfterTransition
      slotProps={{
        backdrop: { timeout: 500 },
        paper: {
          style: {
            minWidth: "70vw",
            maxWidth: "70vw",
            overflow: "clip",
          },
        },
      }}
    >
      <Box className={(basicStyles.modalComponent, styles.bulkModalComponent)}>
        <Box className={basicStyles.modalComponentHeader}>
          <Typography className={basicStyles.modalComponentHeaderTitle}>
            {title}
          </Typography>

          <CustomButton
            variant="outlined"
            onClick={onCloseAction}
            icon={<X />}
          />
        </Box>

        <Box className={basicStyles.divider} />

        <Box className={styles.contentContainer}>
          <Box className={styles.listRenderContainer}>
            <Typography className={styles.contentHeaderTitle}>
              {listHeaderTitle}
            </Typography>

            <Box className={styles.listRenderContent}>
              <Box className={styles.listRender}>
                {renderList(items.slice(0, maxNumItems))}
              </Box>

              <Box className={styles.listRenderForm}>
                <Box className={basicStyles.divider} />

                <Box className={basicStyles.modalComponentFooter}>
                  <CustomButton
                    variant="contained"
                    onClick={() => onConfirmAction(items)}
                  >
                    Confirmar
                  </CustomButton>

                  <CustomButton variant="outlined" onClick={onCloseAction}>
                    Cancelar
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={styles.contentFormContainer}>
            <Typography className={styles.contentHeaderTitle}>
              {formHeaderTitle}
            </Typography>

            <Box className={styles.formContainer}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
